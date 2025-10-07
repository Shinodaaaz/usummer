import 'styled-components';
import { Theme } from '../../config/theme.ts';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
