import type { DrawerScreenProps as ScreenProps } from '@react-navigation/drawer';

type ParamListBase = Record<string, object | undefined>;

export type DrawerScreenProps = ScreenProps<ParamListBase>;
