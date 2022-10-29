# Frondend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



Cafe Management System
1. We have used nodejs as backend and angular as froontend.
Backend


2.first I have created routes for user for signup,login,forgotpassword,changepassword performing these function only if they have authentication or by their role.For 
that I have created services-authentication and checktoken.
3.Then I have added created routes for category to add,get and update it but that provision is for admin only so usage of services-authentication and checktoken.
4.After adding categories I have created routes for product for above categories to add,delete,update,getbycategoryid,getbyproductid etc.
5.Now to generate bill we have created bill route in this we are generatingpdf of bill,getpdf,deleteit by id etc and format of bill is done in report.ejs file that has styling for bill.We have used ejs,uuid,html-pdf packages.
6.Then the overall description of categories,product and bill counts on dashboard.


Frontend

7.First we have create services to link backend with frontend and for that for each of functionality in routes of backend we have created function in various services like user,category,product and calling backend apis with the usage of HttpClient.

8.Then we have created Home component  that elements signup,login,forgotpassword that are handled by individual components it also inclueds best-seller but i have put it as comment .
9.Now whether doing the usage of any of element/Component we may get success or failure for that conveying we have created a snackbarservice that will indicate the result.
10.Now after successful login we will move to dashboard that will specify the summarized report of bill,category,product that is specified in app-routing module.
11.Now after clicking on any of the button of product,category,bill etc we will move to the requested page as specified in routerlink. 
12.Also as we have full component while logging that includes header component as well as sidebar component.
13.Now except these we have created two more services one is route-guard by using checkrole and other is token-interceptor to specify token from local store and authentication purpose etc.
14.Now we have created one very important component i.e material component to manage each of category,product,bill,order,user etc with various components that are in dialog.

 