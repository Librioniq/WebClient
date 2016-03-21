# Welcome in Redux module source folder!<br/>**Here you can see convention of current package!** 

## Module building convention
 1. Choose applicable folder (module) name for you. (For example Question)
 2. Module folder should contain the next files:
    - `constants.ts` - present a list of action types;
    - `actions.ts` - present a list of actions;
    - `reducers.ts` - present a list of reducers;
    - `index.ts` - file-combiner all of source to single variable export style;
 3. Build your module `indext.ts` file like the next:
 ```ts
 import * as Actions from './actions';
 import * as Reducers from './reducers';

 export { Actions };
 export { Reducers };

 export default { Actions, Reducers };
 ```   
 4. Use importing style like the next 
 ```ts
 import ModuleName from 'module path here';
 
 ModuleName.Reducers
 ModuleName.Actions
 ```