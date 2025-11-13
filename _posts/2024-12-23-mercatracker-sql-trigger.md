---
regenerate: true
layout: post
title: "Keeping My Product Database Lean: Eliminating Redundancy with a Clever Trigger"
date: 2024-12-23
last_modified_at: 2024-12-26
pretty_table: true
tags: sql optimization
toc:
  beginning: true
---

As a data enthusiast, I'm constantly looking for ways to optimize my databases and improve efficiency. One of the biggest challenges in managing large datasets is combating redundancy. This led me on a quest to reduce my database size, resulting in a remarkable 95% through a clever trigger. Let me break down how I tackled this problem and the resulting impact on my data.

# The Problem

My database was plagued with duplicate entries, each meticulously reflecting the latest product additions or updates. This resulted in an unnecessarily large dataset that demanded significant storage space and hindered efficient queries. For example, each item added to the product catalogue would result in individual entries in my database. As I'm scraping around 5k items daily, in a hypothetical case where none of the items scraped within a month are updated, this would imply a total of 150k duplicate entries.

# My Solution

The key was to leverage triggers—a special type of automated SQL code that executes when specific events occur within the database. My solution focused on incorporating a trigger that would automatically delete any duplicate entries based on certain criteria after new entries were created in my table called `dumps`.

# How it works

**Trigger Definition:** I created a TRIGGER which is executed whenever a new row is inserted into the table `dumps`.

**Deletion Condition:** Inside the trigger, I utilized the DELETE command to eliminate any duplicate entries based on these conditions:

- `rowid = NEW.rowid`: This ensures that only rows with identical `rowid` values are compared for duplicates.

- `EXISTS (SELECT 1 FROM dumps ...)`: The heart of the solution lies here. We check if there already exists a row in my 'dumps' table that:

  - Has an id matching the `NEW.id` being added.
  - Has a date `ymd` which is the last consecutive record to the new row inserted `NEW.ymd`.
  - Has the same `content` as the newly inserted data.

**Outcome:** This trigger effectively removes consecutive duplicate rows from my database table.

Let me illustrate with an example: imagine a product with `id = 1` is added to the online catalogue:

| id  | ymd        | content        | Comment                                               |
| --- | ---------- | -------------- | ----------------------------------------------------- |
| `1` | `20240101` | `{price: 1.5}` | Initial record                                        |
| `1` | `20240102` | `{price: 1.5}` | This row would **not** be added as it is a duplicate. |
| `1` | `20240103` | `{price: 2.0}` | This row would be added due to the price change.      |
| `1` | `20240104` | `{price: 1.5}` | This row would be also added.                         |

Resulting in the following code for this specific trigger:

# Code Snippet

```sql
CREATE TRIGGER remove_consecutive_duplicates
AFTER INSERT ON dumps
BEGIN
  DELETE FROM dumps
  WHERE rowid = NEW.rowid AND EXISTS (
    SELECT 1 FROM dumps
    WHERE id = NEW.id
      AND ymd = (
        SELECT MAX(ymd) FROM dumps
        WHERE id = NEW.id AND ymd < NEW.ymd
      )
      AND content = NEW.content
  );
END;
```

This experience taught me a valuable lesson: The right approach can significantly improve efficiency, reduce storage costs, and enhance my overall data analysis capabilities. By implementing a clever trigger, I managed to streamline my database for faster performance and less clutter!
