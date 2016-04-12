import { ResponseStrategy as Strategy } from './ResponseStrategy';
import FailureStrategy from './FailureStrategy';
import SuccessStrategy from './SuccessStrategy';
import NotFoundStrategy from './NotFoundStrategy';

export const ResponseStrategy: Strategy[] = [FailureStrategy, SuccessStrategy, NotFoundStrategy];

export default { ResponseStrategy }