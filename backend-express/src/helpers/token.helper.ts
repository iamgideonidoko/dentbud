import Token from '../models/token.model';

export const deleteRefreshTokensByUserId = async (user_id: string) => await Token.deleteMany({ user_id });

export const addRefreshTokenToDb = async (user_id: string, token: string) => {
  await deleteRefreshTokensByUserId(user_id);
  const newToken = new Token({ user_id, token });
  return await newToken.save();
};

export const getRefreshTokenFromDb = async (user_id: string) => {
  const token = await Token.findOne({ user_id });
  if (token) await deleteRefreshTokensByUserId(token?.user_id);
  return token?.token;
};
