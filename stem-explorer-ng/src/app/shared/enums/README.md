# Enums

All our enums will go in this folder, with one enum per file.

An example of when we would need an enum would be if we were comparing data against a string: we would create a file here of all the related strings so we only have to write them once and then reference the enum when needed. Or if we were getting an enum (number) back from the API when we wanted to display a string: the category on Challenges will come back in an enum (numbered 0-3), so we need to have a enum file of what category each number signifies to match it against. 

It's good practice to use strings as little as possible in our `.ts` files, especially when we're going to be repeating that string in multiple places. If we keep it in an enum, then we only have to write the string down once and if it ever needs to be changed we only need to change it in one spot.

## Create an enum

In your new enum file in this folder, an example of how to add an enum:

`export enum MyEnum { 'Category One' = 0, 'Category Two' = 1 }`
