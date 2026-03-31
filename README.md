# Image Processing API Project

This project aims to give you a real-world scenario in which you would read and write to your disk via a Node.js express server rather than a database. The project you create serves two purposes: to prepare you for setting up scalable code and architecture for real-world projects and tie together some of the most popular middleware and utilities found in Node.js projects. This project barely touches the surface of what is possible but will prove your ability to use what you’ve learned in real-world scenarios.

For this project, refactor and test as much as possible while you are building. Since you are using TypeScript and an unfamiliar library, it is sometimes easier to write and build in plain JS to see what your functions return; remember your submission needs to be in TypeScript. As your skills improve, typing in TypeScript will feel more intuitive. Make sure to remove any debugging code from your final submission.

## Creation Date

> 3/15/2026

## Project Status

> Complete

## Getting Started

Usually, you would get some starter code to build from, but with this project, it’s your job to prove you can do it from scratch, so all that is being provided for you is a folder of license-free stock images you are welcome to use. If you would like to use your own images for this project, you are welcome to do so, but whoever reviews your project will see your images, and when you display your project online, viewers will also see them.

You can use your own images or use the ones provided in this repo: [images](images)

## Instructions

Feel free to attempt to create this project based on the overview and rubric specifications. If you get stuck or prefer structured guidance -- here is a walkthrough to get you up and running!

1. **Initialize your project.**
   Add the dependencies required for this project, including Express, TypeScript, Jasmine, Eslint, and Prettier. Complete your package.json file.
   - Where should your dependencies be placed?
   - What scripts should you create to take advantage of the dependencies you've added?
   - Are there other dependencies you would like to add or know you will need to improve your workflow?
2. **Set up your project structure.**
   Create folders and files for what you anticipate you will need for the project.
   - How do you plan to keep your source code and build code separately?
   - Where will you keep your tests?
   - How do you plan to name your routes? Utilities?
3. **Configure your middleware and dependencies.**
   You have quite a few dependencies that all need to work together. Sometimes it's easiest to write some simple js functions to test that all of your dependencies work together before you begin adding any functionality.

   - Does your TypeScript compile?
   - Do your Eslint and Prettier scripts work?
   - Are you able to write and pass

4. **Set up your server and create an API endpoint.** Even though this application is fairly straightforward, you still want to set it up in a scalable way. How can you set up your server and route so that your project remains scalable? Only one endpoint is required. It's best to create this and test that it is working before you move on.

5. **Install [Sharp](https://www.npmjs.com/package/sharp) and configure endpoint.**
   Create a separate module for your processing functionality and import it into your route. You are only required to add resizing, but you may add additional processing if you choose to extend your application. You are only required to work with jpg files, so keep that in mind if you choose to use your own images and they are other formats.
   - Pay close attention to if you need to use asynchronous code or not. If you do, make sure you stay consistent throughout your application.
   - There is limited information on using Sharp with TypeScript, but don't let that be a blocker. Think about what type the Sharp constructor would return. Have a look at the [Sharp Constructor documentation](https://sharp.pixelplumbing.com/api-constructor) and the examples it provides.
6. **Write your tests.**
   If you haven't already been writing unit tests, now would be the time to start. Think about what you should test? At a minimum, you should have at least one test for your endpoint and at least one test for your image processing, but there are many different tests you could create.
7. **Add caching.**
   Add caching to your application so that repeated requests to your endpoint use pre-stored images rather than regenerating a new image each time.
8. **Test, Debug, and Refactor.**
   Think of edge-cases for your project and how someone may access your project. Should they get different error messages based on what's wrong? Make certain that your user isn't left in the dark when something goes wrong.
   - Do all of your tests still pass?
   - Does stopping and restarting your server cause any issues?
   - Does your user get feedback when something goes wrong?
   - Is your code easy to follow? Comments?
   - Is your API production-ready?
9. **Build, Document, and Submit.**
   If everything else has gone well, you should be able to compile your typescript and start up your production server to test that everything still works as expected. Make sure you've provided all necessary information in your readme file, so your reviewer knows how to test your API. If everything works and your documentation is complete, you're ready to submit!
   **_Congratulations!_**

## Working Endpoint URL examples

The URL below will take the user to the home page.
```
http://localhost:5000/
```

The URL below will take the user to a different page that displays a list of the available images.
```
http://localhost:5000/api
```

The URL below will display the image of **encenadaport** with a _width_ of _200_ and a _height_ of _200_.
```
http://localhost:5000/api/images?filename=encenadaport.jpg&w=200&h=200
```

The URL below will display the image of **encenadaport** with a _width_ of _110_ and a _height_ of _110_.
```
http://localhost:5000/api/images?filename=encenadaport.jpg&w=110&h=110
```

## Version Control

Although not a requirement, we recommend using Git from the very beginning if you choose to build on your local environment or use the provided workspace. Make sure to commit often and to use well-formatted commit messages.

## Challenges Faced During Project

One challenge that was faced was running both commands shown below successfully without any errors and warnings:

```
npm test
npm run lint
```

This challenge was overcome by renaming the **"eslint.config.js"** file to **"eslint.config.mjs"**. This was _Option 1_ of the solution given by _Ahmed L_ in _Knowledge, Udacity_.

## Udacity Mentors Who Have Answered Questions In Knowledge To Help With Project
- Mayur R
- Ahmed L
- Oscar

## Languages

**Express**

<a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img width="114" height="216" alt="express_logo" src="https://github.com/user-attachments/assets/922b7eb3-f9a5-45d8-add7-e73f07cff732" /> </a> 

**Jasmine**

<a href="https://jasmine.github.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jasmine/jasmine-icon.svg" alt="jasmine" width="40" height="40"/> </a>

**JavaScript**

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>

**Node.js**

<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img width="59" height="49" alt="node_js_logo" src="https://github.com/user-attachments/assets/bc05c6f4-2ccb-41ab-a499-d0cdee52540f" /> </a>

**TypeScript**

<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>


## Tools

**Visual Studio Code** - The application software where the project is edited.

<p align="left"> <img width="43" height="46" alt="VSCode_logo" src="https://github.com/user-attachments/assets/0f8d15c4-276a-46ef-92cd-80a2f1958e76" /> </p>


**GitHub Desktop** - The application software that gives access to the project from _GitHub_ and allows it to be edited in _Visual Studio Code_.

<p align="left"> <img width="46" height="46" alt="GitHub_Desktop_logo" src="https://github.com/user-attachments/assets/bbd2a72d-0953-499e-ab28-e55b11171b83" /> </p>


**ChatGPT** - The application software that answers specific questions of why project has specific problems or why project failed to achieve intended results.

<p align="left"> <img width="49" height="42" alt="ChatGPT_logo" src="https://github.com/user-attachments/assets/34fd410d-3e92-4fc6-8dc7-1be521a8d2a6" /> </p>


## Credits
###### References used while making project

alejandro, and Promise. “Conflicts between Eslint and Jasmine Files.” _Knowledge_, Udacity, 2022, knowledge.udacity.com/questions/645790. Accessed 23 Mar. 2026.

_Brand Guide_, nodejs.org/static/documents/foundation-visual-guidelines.pdf. Accessed 17 Mar. 2026.

_ChatGPT_, chatgpt.com/. Accessed 23 Mar. 2026.

“CLI.” _Prettier RSS_, prettier.io/docs/cli. Accessed 21 Mar. 2026.

“Configuration Migration Guide.” _ESLint_, eslint.org/docs/latest/use/configure/migration-guide. Accessed 23 Mar. 2026.

Du, Wenfang, and thorn0. “Prettier - How to Ignore Certain File Types in CLI File Patterns?” _Stack Overflow_, https://stackoverflow.com/#organization, 24 Feb. 2021, stackoverflow.com/questions/66299219/prettier-how-to-ignore-certain-file-types-in-cli-file-patterns. Accessed 21 Mar. 2026.

“ESLint.” _npm_, 7 Mar. 2026, www.npmjs.com/package/eslint. Accessed 17 Mar. 2026.

“Express Logo PNG Transparent.” _Freebie Supply_, freebiesupply.com/logos/express-logo/. Accessed 17 Mar. 2026. 

“Getting Started with ESLint.” _ESLint_, eslint.org/docs/latest/use/getting-started. Accessed 17 Mar. 2026.

“GitHub Profile README Generator.” _GitHub Profile Readme Generator | GitHub Profile Readme Generator_, rahuldkjain.github.io/gh-profile-readme-generator/. Accessed 17 Mar. 2026.

“Installation.” _sharp_, sharp.pixelplumbing.com/install/. Accessed 26 Mar. 2026.

Islam, and Dániel H. “Image Processing Project: Eslint Errors.” _Knowledge_, Udacity, 2022, knowledge.udacity.com/questions/641178. Accessed 23 Mar. 2026.

islamCodehood. “Image-Processing-Api/.Eslintrc.” _GitHub_, 2021, github.com/islamCodehood/image-processing-api/blob/main/.eslintrc. Accessed 23 Mar. 2026.

kellywoldseth. “imageAPI / .Eslintrc.Json.” _GitHub_, 2022, github.com/kellywoldseth/imageAPI/blob/master/.eslintrc.json. Accessed 23 Mar. 2026.

Khosla, Aayush. “NPM Sharp.” _GeeksforGeeks_, GeeksforGeeks, 23 July 2025, www.geeksforgeeks.org/node-js/npm-sharp/. Accessed 26 Mar. 2026.

“Make a README.” _GitHub_, GitHub, www.makeareadme.com/. Accessed 30 Mar. 2026.

“MLA Works Cited: Electronic Sources (Web Publications).” _MLA Works Cited: Electronic Sources - Purdue OWL® - Purdue University_, owl.purdue.edu/owl/research_and_citation/mla_style/mla_formatting_and_style_guide/mla_works_cited_electronic_sources.html. Accessed 17 Mar. 2026.

“npm V10+.” _sharp_, sharp.pixelplumbing.com/install/#npm-v10. Accessed 26 Mar. 2026.

Nyakundi, Hillary. “How to Write a Good README File for Your GitHub Project.” _freeCodeCamp.Org_, freeCodeCamp.org, 8 Dec. 2021, www.freecodecamp.org/news/how-to-write-a-good-readme-file/. Accessed 17 Mar. 2026.

Pilafian, Pilaf T., et al. “Configure ESLint (Eslint.Config.Js) to Only Analyze TypeScript Files (*.Ts).” _Stack Overflow_, https://stackoverflow.com/#organization, 3 Aug. 2024, stackoverflow.com/questions/78827606/configure-eslint-eslint-config-js-to-only-analyze-typescript-files-ts. Accessed 23 Mar. 2026.

“READMEs.” _styleguide_, google.github.io/styleguide/docguide/READMEs.html#:~:text=About%20README.md%20files.,%2Ddate%20README.md%20file. Accessed 30 Mar. 2026.

“Routing.” _express_, expressjs.com/en/guide/routing.html. Accessed 16 Mar. 2026.

sahil. “Building an Express Web App for File Uploads and Dynamic Image Processing on the Fly.” DEV Community, DEV Community, 6 Nov. 2024, dev.to/itxsahil/building-an-express-web-app-for-file-uploads-and-dynamic-image-processing-on-the-fly-1k0l#:~:text=When%20you%20access%20any%20of%20the%20URLs,the%20server%20will%20process%20the%20image%20accordingly. Accessed 27 Mar. 2026.

“sharp.” _npm_, Oct. 2026, www.npmjs.com/package/sharp. Accessed 16 Mar. 2026.

Srivastava, Abhishek. “Guide to Writing on Readme.Md (.Markdown)File for GitHub Project.” _Medium_, 16 Nov. 2022, abhiappmobiledeveloper.medium.com/guide-to-writing-on-readme-md-markdown-file-for-github-project-8aad4e4e2a15. Accessed 30 Mar. 2026.

“Udacity Git Commit Message Style Guide.” _Udacity Nanodegree Style Guide_, udacity.github.io/git-styleguide/. Accessed 15 Mar. 2026. 

Udacity, et al. “Udacity/CD0292-Building-a-Server-Project-Starter: Final Project for Backend Development with Node.Js Created by Rachel Manning.” _GitHub_, Udacity, 2021, github.com/udacity/cd0292-building-a-server-project-starter. Accessed 15 Mar. 2026.

W, Kelly, and Mayur R. “Eslint, Jasmine, Dependencies in General - Question on Image API.” _Knowledge_, Udacity, 2022, knowledge.udacity.com/questions/831847. Accessed 19 Mar. 2026.

## License

[License](LICENSE.txt)
