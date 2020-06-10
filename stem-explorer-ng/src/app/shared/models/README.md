# Models

A model is a type or interface and a way that we define our data that allows us to make sure it's correct when we're coding.

We would create a model to define what data object we get back from the API (for example, what properties are in a challenge), or how data should be formatted if it's being used somewhere (for example, what properties a data object would be if it's being used by a drop down field).

An example of a model could be:

`export interface Challenge {`
`  title: string;`
`  category: STEMTypes;`
`  question: string;`
`  answer: number;`
`  hint?: string;`
`}`

This challenge data object needs to have a title, category, question, and answer. It can also have a hint, but the `?` signifies that this is optional. These properties are also set as having strict types: this means that the answer must be a number, and the category must be what the STEMTypes enum defines.