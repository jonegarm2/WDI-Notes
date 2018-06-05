# Dino Skull-Duggery

<img src="https://i.imgur.com/tNojCSK.jpg">

> Hello there, friend! My name is John Hammond, and I am a *collector* of 
> sorts. I have a lucrative venture I'm working on; I call it *Jurassic Park*! 
> It will be the greatest museum ever for dinosaurs... All I need are the 
> samples. Can you help me find them?

Do you have what it takes to go into business with eccentric billionaire
John Hammond? Working with complex data structures is part of the job, and 
it's vital that you get used to it.

```ruby
hammonds_mines = {
  :working => [
    {
      :location      => "Mongolia",
      :depth         => "150 meters",
      :annual_budget => 850_000,
      :specimens => [
        "Brachiosaurus",
        "Triceratops", 
        "Gallimimus",
        "Compsognathus"
      ]
    },
    {
      :location      => "Nicaragua",
      :depth         => "200 meters",
      :annual_budget => 1_500_000,
      :specimens => [
        "Tyrannosaurus Rex", 
        "Stegosaurous", 
        "Triceratops"
      ]
    },
    {
      :location      => "Patagonia",
      :depth         => "400 meters",
      :annual_budget => 1_200_000,
      :specimens => [
        "Dilophosaurus", 
        "Brachiosaurus",
        "Triceratops",
        "Velociraptor"
      ]
    }, 
    {
      :location      => "Mexico",
      :depth         => "350 meters",
      :annual_budget => 900_000,
      :specimens => [
        "Stegosaurous",
        "Gallimimus",
        "Parasaurolophus"
      ]
    }
  ],
  :planned => [
    "China",
    "Nicaragua 2"
  ]
}
```

### Exercise 1 — Access information in the data structure

Begin a new `pry` session, and then copy and paste the above code into it. 
Answer these questions. After that, work for each part should be done in 
the files named.

1. What kind of data structure is `hammonds_mines`?
1. How many "working" mines does he have? How many are "planned"? 
   Save each to appropriately named variables.
1. Access the depth of John Hammond's mine in Mexico. Save the depth to an 
   appropriately named variable.
  - What is the data type of the depth?
  - Can you write a Ruby statement that will tell us if it under the limit 
    for unregulated mines in Mexico, which is 200 meters? What would that 
    statement be?
1. Access the annual budget for Hammond's mine in Patagonia. Save the budget 
   to an appropriately named variable.
  - If there are 50 workers there, how much is the maximum each can be 
    payed every month (in US dollars)?
1. Access the list of dinosaur specimens found in Nicaragua.
1. Access all the Stegosaurouses.

Once you have the answers to the above questions 
(and the code snippets for each), stop.

### Exercise 2 — Interact with the data in the structure

**File name**: `analyse_mines.rb`

1. The budget must be cut! Write a method (`low_budget_mines`) that returns an 
   array of only the mines with a budget at or below `1_000_000`.
1. Write a method (`high_yield_mines`) that returns an array only of the mines 
   that have 4 or more specimens.
1. Write a method (`mine_analysis`) that it returns a hash of each mine's 
   location and it's budget per specimen, like this:

    ```ruby
    {
      :location => "...",
      :budget_per_specimen => 0.0
    }
    ```

1. Write a method (`best_mines`) that sorts an array of mines of the type above
   based on their "mine analysis," from lowest budget per specimen to highest!

### Exercise 3 — Add and remove data in the structure

**File name**: `mines_growth_plan.rb`

1. Nicaragua's not cutting it! Write a method (`clean_house`) that removes 
   Nicaragua from the working mines.
1. Update the method to add the name "Nicaragua" to a new array of mines 
   (like "working" or "planned," it should be a value within the 
   `hammonds_mines` hash), called "`:defunct`" (a symbol).
1. Upgrade our planned "Nicaragua 2" mine! Our program should also remove it 
   from the list of "planned" mines and add a new working mine with the 
   following data:
  - location: Nicaragua 2, depth: 50 meters, annual budget: $100,000, and no 
    specimens yet

### Exercise 4 — Begin working with the data structure

**File name**: `project_jp_top_secret.rb`

Your budget has been re-upped and you've decided you're going to open a park 
using the DNA specimens found in Nicaragua (they're the most popular). 
For this part, use the original data structure above (not the output of 
Exercise 3)!

Write a program that:

1. takes a user's decision about a location, after printing the working locations,
1. prints out a list of the specimens found there.

> **There's a big problem**; it's a liability to create dinosaurs that can 
> breed in the wild, so you have to add a dash of hermaphroditic frog DNA to 
> ensure they can't breed, **but you can't ruin the original specimens**. Use 
> the appropriate tool to create a new array of dinosaurs specimens, each 
> "with a dash of hermaphroditic frog DNA!" 
> For example: "Tyrannosaurus Rex with a dash of hermaphroditic frog DNA"

Finally:

1. Update our program to output the list of specimens 
   "with a dash of hermaphroditic frog DNA."
