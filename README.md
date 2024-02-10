# Announcement-Module Research Project

## Version 1.5

### This research project is done by Han Ming and Jerald.

In Singapore Polytechnic Computing courses, Year 1 students will go through Computing Fundamentals in Y1S1. Notably, Diploma in information technology will take up both backend and frontend development. However Juniors are taught on a very surface level on backend and frontend development concepts.

As a note for FED juniors are taught (CSS and HTML) and BED (JS, ExpressJS)

Most Juniors have a mentality that as long as their code works, it is fine. This will result in them having bad habits especially when working with bigger teams. 

This also has affected the students in the INC Program. Not understanding how teams should address their coding standards. Which in turn will result in time wasted when it could have been prevented if communication and good coding practices were in place. To Address this, The Announcement Module team has defined the following OKRs to provide knowledge that can be used to educate future batches in SoC. Our project has been broken down into many versions to simulate different circumstances when there is lack of communication and good coding practices. Students are able to see the code qualities at different versions, which will make them realize why communication, collaboration and good coding practices are paramount to efficiently executing team projects.

Announcement Module uses T3 Stack (typescript)


Version 1.5 Fact Sheet

| Property       | Remarks                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| ESLint         | ✅ This Version has been implemented with ESLint. All Errors have been rectified: Link to Docs: https://docs.google.com/document/d/1K3Pf4ypCDHgMYUDHNnoo_tFcWtMwGsPCIYbhSTx6-G4/edit?usp=sharing    |
| UI             | Used bare UI as no communication has been done with the **UI Team**  Toasts were taken out and changed to static divs                                    |
| App Router     | ✅ Every CRUD Is **defined in its own page** and app router is used                                      |
| UMS            | **No authentication or App Router** has been enforced for user roles. No communication with the UMS Team |
| Date time | ✅ Changed the way our database saves timestamp to be saved now with timezone **timestamptz**                                                                      |
| Playwright | ✅ We also implemented playwright into our current simple announcement module for end to end testing                                                                         |
