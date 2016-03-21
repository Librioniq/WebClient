# Welcome in Test folder!<br/>**Here you can see convention of current package!** 

## **Convention**
 1. Folder structure should copy folder structure as in main folder. 
 It make navigation and test understanding easer.
 2. To build test for specify module or TypeScript file use `'{filename}.test.ts'` naming rule.

## **Test building**
***Tools:***
 - mocha
 - chai
 - supertest
 
**Example**
```ts
// reference to definition
/// <reference path='../../../../typings/main.d.ts'/>


import { expect } from 'chai';

describe("Some description", () => {
    it("should do something", () => {
        // your code here...
    });
});
```   

For more info follow the [link](https://mochajs.org);