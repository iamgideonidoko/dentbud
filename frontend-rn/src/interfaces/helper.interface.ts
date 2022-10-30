import type { DrawerScreenProps as ScreenProps } from '@react-navigation/drawer';

type ParamListBase = Record<string, object | undefined>;

export type DrawerScreenProps = ScreenProps<ParamListBase>;

export interface AccordionSection<T = string> {
  title: string;
  content: T;
}

export type AccordionRenderFC<AdditionalArgs = Record<string, unknown>, ContentType = string> = (
  args: AdditionalArgs,
  section: AccordionSection<ContentType>,
  index: number,
  isActive: boolean,
  sections?: AccordionSection<ContentType>[],
) => JSX.Element;
