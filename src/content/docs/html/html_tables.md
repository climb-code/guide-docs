---
title: HTML Tables
description: Learn how to create and structure HTML tables for displaying tabular data with proper semantics, accessibility, and responsive design.
---


Tables display data in rows and columns. Learn how to create accessible, well-structured tables for presenting tabular information.

## Basic Table Structure

```html
<table>
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>Data 1</td>
        <td>Data 2</td>
    </tr>
</table>
```

**Elements:**
- `<table>`: Container for the table
- `<tr>`: Table row
- `<th>`: Table header cell
- `<td>`: Table data cell

## Complete Table Example

```html
<table>
    <tr>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
    </tr>
    <tr>
        <td>John Doe</td>
        <td>30</td>
        <td>New York</td>
    </tr>
    <tr>
        <td>Jane Smith</td>
        <td>25</td>
        <td>Los Angeles</td>
    </tr>
    <tr>
        <td>Bob Johnson</td>
        <td>35</td>
        <td>Chicago</td>
    </tr>
</table>
```

## Table Sections

Organize tables with semantic sections:

```html
<table>
    <thead>
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Laptop</td>
            <td>$999</td>
            <td>5</td>
        </tr>
        <tr>
            <td>Mouse</td>
            <td>$29</td>
            <td>15</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Total</td>
            <td>$1,433</td>
            <td>20</td>
        </tr>
    </tfoot>
</table>
```

**Sections:**
- `<thead>`: Table header group
- `<tbody>`: Table body group
- `<tfoot>`: Table footer group

## Column Spanning

Span cells across multiple columns with `colspan`:

```html
<table>
    <tr>
        <th colspan="3">Employee Information</th>
    </tr>
    <tr>
        <th>Name</th>
        <th>Department</th>
        <th>Salary</th>
    </tr>
    <tr>
        <td>John Doe</td>
        <td>Engineering</td>
        <td>$90,000</td>
    </tr>
</table>
```

## Row Spanning

Span cells across multiple rows with `rowspan`:

```html
<table>
    <tr>
        <th>Name</th>
        <th>Monday</th>
        <th>Tuesday</th>
    </tr>
    <tr>
        <td rowspan="2">John</td>
        <td>Math</td>
        <td>Science</td>
    </tr>
    <tr>
        <td>History</td>
        <td>English</td>
    </tr>
</table>
```

## Complex Spanning Example

```html
<table>
    <thead>
        <tr>
            <th rowspan="2">Student</th>
            <th colspan="2">Semester 1</th>
            <th colspan="2">Semester 2</th>
        </tr>
        <tr>
            <th>Math</th>
            <th>Science</th>
            <th>Math</th>
            <th>Science</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John</td>
            <td>85</td>
            <td>90</td>
            <td>88</td>
            <td>92</td>
        </tr>
        <tr>
            <td>Jane</td>
            <td>92</td>
            <td>87</td>
            <td>94</td>
            <td>89</td>
        </tr>
    </tbody>
</table>
```

## Table Caption

Add a title/description to your table:

```html
<table>
    <caption>Monthly Sales Report - Q4 2024</caption>
    <thead>
        <tr>
            <th>Month</th>
            <th>Sales</th>
            <th>Growth</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>October</td>
            <td>$50,000</td>
            <td>+5%</td>
        </tr>
        <tr>
            <td>November</td>
            <td>$55,000</td>
            <td>+10%</td>
        </tr>
        <tr>
            <td>December</td>
            <td>$65,000</td>
            <td>+18%</td>
        </tr>
    </tbody>
</table>
```

## Column Groups

Define column properties with `<colgroup>` and `<col>`:

```html
<table>
    <colgroup>
        <col style="background-color: #f0f0f0;">
        <col span="2" style="background-color: #e0e0e0;">
    </colgroup>
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>123-456-7890</td>
        </tr>
    </tbody>
</table>
```

## Table Headers Scope

Improve accessibility with `scope` attribute:

```html
<table>
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">City</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Student 1</th>
            <td>20</td>
            <td>Boston</td>
        </tr>
        <tr>
            <th scope="row">Student 2</th>
            <td>22</td>
            <td>Seattle</td>
        </tr>
    </tbody>
</table>
```

**Scope values:**
- `col`: Header for a column
- `row`: Header for a row
- `colgroup`: Header for a group of columns
- `rowgroup`: Header for a group of rows

##  Practical Examples

### Pricing Table

```html
<table>
    <caption>Pricing Plans</caption>
    <thead>
        <tr>
            <th scope="col">Feature</th>
            <th scope="col">Basic</th>
            <th scope="col">Pro</th>
            <th scope="col">Enterprise</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Price</th>
            <td>$9/mo</td>
            <td>$29/mo</td>
            <td>$99/mo</td>
        </tr>
        <tr>
            <th scope="row">Storage</th>
            <td>10 GB</td>
            <td>100 GB</td>
            <td>Unlimited</td>
        </tr>
        <tr>
            <th scope="row">Users</th>
            <td>1</td>
            <td>5</td>
            <td>Unlimited</td>
        </tr>
        <tr>
            <th scope="row">Support</th>
            <td>Email</td>
            <td>Email & Chat</td>
            <td>24/7 Phone</td>
        </tr>
    </tbody>
</table>
```

### Schedule/Timetable

```html
<table>
    <caption>Class Schedule - Spring 2024</caption>
    <thead>
        <tr>
            <th scope="col">Time</th>
            <th scope="col">Monday</th>
            <th scope="col">Tuesday</th>
            <th scope="col">Wednesday</th>
            <th scope="col">Thursday</th>
            <th scope="col">Friday</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">9:00 AM</th>
            <td>Math 101</td>
            <td>Physics 201</td>
            <td>Math 101</td>
            <td>Physics 201</td>
            <td>Lab</td>
        </tr>
        <tr>
            <th scope="row">11:00 AM</th>
            <td>History</td>
            <td>Chemistry</td>
            <td>History</td>
            <td>Chemistry</td>
            <td>Study Hall</td>
        </tr>
        <tr>
            <th scope="row">1:00 PM</th>
            <td colspan="5">Lunch Break</td>
        </tr>
        <tr>
            <th scope="row">2:00 PM</th>
            <td>English</td>
            <td>Art</td>
            <td>English</td>
            <td>Music</td>
            <td>Free</td>
        </tr>
    </tbody>
</table>
```

### Financial Report

```html
<table>
    <caption>Quarterly Financial Report</caption>
    <thead>
        <tr>
            <th scope="col">Quarter</th>
            <th scope="col">Revenue</th>
            <th scope="col">Expenses</th>
            <th scope="col">Profit</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Q1</th>
            <td>$100,000</td>
            <td>$70,000</td>
            <td>$30,000</td>
        </tr>
        <tr>
            <th scope="row">Q2</th>
            <td>$120,000</td>
            <td>$75,000</td>
            <td>$45,000</td>
        </tr>
        <tr>
            <th scope="row">Q3</th>
            <td>$115,000</td>
            <td>$72,000</td>
            <td>$43,000</td>
        </tr>
        <tr>
            <th scope="row">Q4</th>
            <td>$135,000</td>
            <td>$80,000</td>
            <td>$55,000</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row">Total</th>
            <td>$470,000</td>
            <td>$297,000</td>
            <td>$173,000</td>
        </tr>
    </tfoot>
</table>
```

### Product Comparison

```html
<table>
    <caption>Product Comparison</caption>
    <thead>
        <tr>
            <th scope="col">Feature</th>
            <th scope="col">Model A</th>
            <th scope="col">Model B</th>
            <th scope="col">Model C</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Screen Size</th>
            <td>13"</td>
            <td>15"</td>
            <td>17"</td>
        </tr>
        <tr>
            <th scope="row">Processor</th>
            <td>i5</td>
            <td>i7</td>
            <td>i9</td>
        </tr>
        <tr>
            <th scope="row">RAM</th>
            <td>8GB</td>
            <td>16GB</td>
            <td>32GB</td>
        </tr>
        <tr>
            <th scope="row">Storage</th>
            <td>256GB SSD</td>
            <td>512GB SSD</td>
            <td>1TB SSD</td>
        </tr>
        <tr>
            <th scope="row">Price</th>
            <td>$999</td>
            <td>$1,499</td>
            <td>$2,499</td>
        </tr>
    </tbody>
</table>
```

## Responsive Tables

### Scrollable Table

```html
<div style="overflow-x: auto;">
    <table>
        <thead>
            <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
                <th>Column 4</th>
                <th>Column 5</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
            </tr>
        </tbody>
    </table>
</div>
```

## Accessibility Best Practices

```html
<table>
    <!-- Always include caption -->
    <caption>Employee Directory</caption>
    
    <!-- Use thead, tbody, tfoot -->
    <thead>
        <tr>
            <!-- Use scope attribute -->
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Email</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <!-- Row headers also use scope -->
            <th scope="row">John Doe</th>
            <td>Engineering</td>
            <td>john@example.com</td>
        </tr>
    </tbody>
</table>

<!-- For complex tables, use headers and id -->
<table>
    <tr>
        <th id="name">Name</th>
        <th id="dept">Department</th>
    </tr>
    <tr>
        <td headers="name">John</td>
        <td headers="dept">Engineering</td>
    </tr>
</table>
```

## Best Practices

1. **Use tables for tabular data only**: Not for layout
2. **Include a caption**: Describes the table's purpose
3. **Use semantic sections**: thead, tbody, tfoot
4. **Add scope to headers**: Improves accessibility
5. **Keep tables simple**: Complex tables are hard to read
6. **Make responsive**: Allow horizontal scrolling on mobile
7. **Don't nest tables**: Makes code complex and inaccessible
8. **Use consistent formatting**: Align numbers right, text left
9. **Avoid empty cells**: Use "N/A" or "-" instead
10. **Test with screen readers**: Ensure accessibility

## Common Mistakes

```html
<!-- ❌ Using tables for layout -->
<table>
    <tr>
        <td>Header</td>
    </tr>
    <tr>
        <td>Sidebar</td>
        <td>Main Content</td>
    </tr>
</table>

<!-- ❌ Missing thead/tbody -->
<table>
    <tr><th>Name</th></tr>
    <tr><td>John</td></tr>
</table>

<!-- ❌ No caption -->
<table>
    <tr><th>Data</th></tr>
</table>

<!-- ❌ Mixing th and td incorrectly -->
<table>
    <tr>
        <td>Name</td>  <!-- Should be <th> -->
        <td>Age</td>   <!-- Should be <th> -->
    </tr>
</table>

<!-- ✅ Correct approach -->
<table>
    <caption>User Data</caption>
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John</td>
            <td>30</td>
        </tr>
    </tbody>
</table>
```

## Summary

- Use `<table>` for tabular data only
- Structure with `<thead>`, `<tbody>`, `<tfoot>`
- Use `<th>` for headers, `<td>` for data cells
- Add `<caption>` to describe the table
- Use `colspan` and `rowspan` for spanning cells
- Include `scope` attribute for accessibility
- Make tables responsive for mobile devices
- Keep tables simple and readable
- Test accessibility with screen readers

Tables are powerful for presenting structured data - use them correctly for the best user experience!
