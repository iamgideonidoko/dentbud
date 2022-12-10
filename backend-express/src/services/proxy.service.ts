import needle from 'needle';
import constants from '../config/constants.config';
import type { CallRasaRes, IGoogleBookAPIResponse } from '../interfaces/proxy.interface';
import logger from '../config/logger.config';
import googleIt from 'google-it';
import { fetchSingleRandomCourseByUserId } from './course.service';
import Task from '../models/task.model';
import Course from '../models/course.model';

export const callRasa = (data: { sender: string; text: string }): Promise<CallRasaRes> => {
  return new Promise<CallRasaRes>((resolve, reject) => {
    console.log('Rasa Input: ', data);
    needle.post(`${constants.rasaHost}/webhooks/dentbud/webhook`, data, { json: true }, (err, rasaRes) => {
      if (err) reject(err);
      console.log('Rasa Response: ', rasaRes.body);
      resolve(rasaRes.body?.[0]);
    });
  });
};

export const callGoogleBooksApi = (query: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    needle.get(`${constants.bookBaseUrl}?q=${query}&maxResults=3&projection=lite`, (err, bookRes) => {
      if (!err) {
        const response = bookRes.body as IGoogleBookAPIResponse;
        const books = response?.items
          ?.map(
            (item) =>
              `![${item?.volumeInfo?.title}](${item?.volumeInfo?.imageLinks?.thumbnail})\n[${item?.volumeInfo?.title}](${item?.volumeInfo?.previewLink})\n[Read book](${item?.volumeInfo?.previewLink})`,
          )
          .join('\n');
        resolve(`Here are some recommendations:\n${books}`);
      } else {
        reject(err);
        console.log('Error: ', err);
      }
    });
  });
};

export const replaceNamePlaceholder = (text: string, replacer: string): Promise<string> => {
  return new Promise<string>((resolve) => {
    resolve(text.replace('{{name}}', replacer));
  });
};

export const processText = (
  text: string,
  initText: string,
  userInfo: { id: string; name: string; email: string },
): Promise<string> => {
  return new Promise<string>(async (resolve) => {
    let resText = ``;
    if (text.includes('[[NLU_FALLBACK]]')) {
      try {
        const googleRes = (await googleIt({ query: initText, limit: 1, 'no-display': true })) as Array<{
          title: string;
          link: string;
          snippet: string;
        }>;
        // send if there is a valid response from google
        resText = googleRes[0]?.snippet
          ? `${googleRes[0]?.snippet}
        [Read more](${googleRes[0]?.link})`
          : '';
      } catch (err) {
        console.log('Google it error: ', err);
      }
    } else if (text.includes('[[SEND_ALL_TASKS]]')) {
      const tasks = await Task.find().sort({ created_at: -1 });
      const allTasks = tasks.map((task) => task.title).join('\n');
      if (allTasks.length === 0) {
        resText = 'You have not added any courses';
      } else {
        resText = `Here are all your tasks:\n${allTasks}`;
      }
    } else if (text.includes('[[SEND_ALL_COURSES]]')) {
      const courses = await Course.find().sort({ created_at: -1 });
      const allCourses = courses.map((course) => `${course.course_name} (${course.course_code})`).join('\n');
      if (allCourses.length === 0) {
        resText = 'You have not added any courses';
      } else {
        resText = `Here are all your courses:\n${allCourses}`;
      }
    } else if (text.includes('[[SEND_BOOK_RECOMMENDATIONS]]')) {
      const randomCourse = await fetchSingleRandomCourseByUserId(userInfo.id);
      let query: string;
      if (randomCourse) {
        query = randomCourse.course_name;
      } else {
        query = 'computer science';
      }
      resText = await callGoogleBooksApi(query);
    } else if (text.includes('[[ADD_TASK]]')) {
    } else if (text.includes('[[SEND_TODAY_TASK]]')) {
    } else {
      resText = text;
    }
    resolve(resText);
  });
};

export const checkRasaHealth = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    needle.get(`${constants.rasaHost}/`, (err) => {
      if (err) logger.error('RASA HEALTH: BAD');
      logger.success('RASA HEALTH: OK');
      resolve();
    });
  });
};
