# Components

This folder will hold our `dumb` Angular components. These are the child components of those that are in the `./containers` folder. 

The components in this folder receive data from their parent and send it back, they are not meant to manipulate the data in any way. They also are only accessible from the parent component and should only "speak" to their parent; so you shouldn't be importing references to other parts of the project (i.e. a service file).

A good example are to think of these components as the waiters in the restaurant, with the customer being the person viewing the web app, and the container components being the chefs in the kitchen. The waiters only bring the food out to give to the customer and take the empty plates back, they don't cook the food or change the food.

## Add a component

Not every container component needs a child component, these are only useful if you have a lot of things happening in the parent component and you want to manipulate the view. For this example, we'll use viewing individual challenges from a list as our example, with a list of the challenges being our parent component.

A child component might also be useful to create if you have a view that you are repeating, such as a nav bar, side menu, dialog pop up, or form field. These would be created to be shared amongst many different parent components.

### Create the component

You can use the Angular-CLI to do this in your terminal by typing in:

`ng g component components/list-challenge-item`

This will create four files:

`list-challenge-item.component.ts`

`list-challenge-item.component.spec.ts`

`list-challenge-item.component.scss`

`list-challenge-item.component.html`

As well as adding this component to the `app.module.ts` file and adding the code you need in each file to begin.

## Access your child component

### From within in the parent template

This example will show how to embed the child template within the parent template.

Near the top of the `list-challenge-item.component.html` within the Component TypeDecorator, there is a property showing:

`selector: 'app-list-challenges',`

This is the html tag to add to our parent's html template to call this child component. So within the `list-challenges.component.html` we would add:

`<app-list-challenge-item></app-list-challenge-item>`

This will now display all the html in the `list-challenge-item.component.html` file in the spot you have put the html tag.

### From a new view

This example will show you how to navigate to a new view to see your child component.

You will need to add our component to `app-routing.module.ts` and give it a path. In the `routes` array, you will need to add:

`{ path: 'list/:id', component: ListChallengeItemComponent }`

The `path` is what will show in the route and the `:id` means that it will expect a unique id to show this - in this case, it will be the challenge id.

## Passing data to the component

To pass data to this component, you will need to do that from the parent's html template. This data needs to be a property in the parent component. It is done using the square brackets: [] and passed in the html tag.

`<app-list-challenge-item [challenge]="challenge"></app-list-challenge-item>`

Everytime a square bracket is used, it is passing data from one component to another.

This means our component also needs a property called `challenge`. The property in the [square brackets] are the properties on the child component, and the property in the "quote marks" is the property on the parent component.

To receive this data in our child component, we need to add it using an input inserted above our constructor:

`@Input() challenge: any;`

And we need to make sure the Input is imported by adding it to the imports from `@angular/core`, like this:

`import { Component, OnInit, Input } from '@angular/core';`

The `any` at the end of our input in the component says what type of data we should be expecting from the parent; this could be a `string`, `number`, `boolean`, or a custom data model that we have created ourselves.

We now have the data from our parent component that we can use and show in our child component how we would any property!

## Sending data from the component

To send data back to our parent component, we need to also add it to the parent's html template with functions. The parent component needs to have the function and this is done using (parentheses) and passed in the html tag.

`<app-list-challenge-item (submitAnswer)="submitAnswer($event)"></app-list-challenge-item>`

Everytime a parentheses is used, it means the parent component can receive something back.

Our parent component will have a function called `submitAnswer()` and this is what is in the "quote marks". Using `($event)` signals that this function is expecting to receive data. Our child component will need to have an Output to send this back. To do this, we need to add an output inserted above our constructor:

`@Output() submitAnswer = new EventEmitter<any>();`

And we need to make sure the output and event emitter is imported by adding it to the imports from `@angular/core`, like this:

`import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';`

The `<any>` at the end of our output in the component says what type of data we should be sending to the parent; this could be a `string`, `number`, `boolean`, or a custom data model that we have created ourselves.

We can pass data back through this output by calling it within our component using:

`this.submitAnswer.emit('Yes!')`
