# Recreating AND with OR and NOT

You have learned about the `AND`,`OR` and `NOT` Boolean operators. These operators can work on any values in JS (coercing them to their "truthy" or "falsey" values). JavaScript also has support for bitwise Boolean operators: 

* `|`
* `&`
* `~`

The above operators assume that their operands are 32-bit bit strings.

Here are the truth tables for the above operators: 

| OR | 0 | 1 |    
|----|---|---|
| 0  | 0 | 1 |
| 1  | 1 | 1 |

| AND | 0 | 1 |
|-----|---|---|
| 0   | 0 | 0 |
| 1   | 0 | 1 |

| NOT  | 0 | 1 |
|------|---|---|
|  -   | 1 | 0 |

**Question**: How can you recreate the `&` bitwise operator only using `|` and `~`?