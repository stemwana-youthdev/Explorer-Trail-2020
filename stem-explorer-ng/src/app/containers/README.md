# Containers

This folder will hold all our Angular components. These components will sit within their own folder and consist of 4 files: `.ts`, `.html`, `.scss`, `.spec.ts`.

The components in these folders are what we would consider "smart" components - they are the parent components for a view that will be handling logic, and they will pass and receive data from their child components which will sit in the `./components` folder. They sit in this `./containers` folder because they contain the data, the logic, and the child components.

## Add a Container Component

Add a new component when you're adding a new feature view. For this example, we'll use adding a list of the challenges as the new feature view.

### Create the Container component:

You can use the Angular-CLI to do this in your terminal by typing in:

`ng g component containers/list-challenges`

This will create four files:

`list-challenges.component.ts`

`list-challenges.component.spec.ts`

`list-challenges.component.scss`

`list-challenges.component.html`

As well as adding this component to the `app.module.ts` file and adding the code you need in each file to begin.

## Using a Container Component

Container components should be their own views. This means you shouldn't need to call these within another view. For example, they would be the `home` page or the `about` page; they are whole pages and not parts of another.

## Viewing a Container Component

To view this component, you will need to add it to the `app-routing.module.ts` file to give it it's own view.

Within the `routes` array, you would add for our example:

`{ path: 'list', component: ListChallengesComponent }`

The `path` is what will appear in the URL route. This can be left as an empty string which will mean that the view is on the very first page.
