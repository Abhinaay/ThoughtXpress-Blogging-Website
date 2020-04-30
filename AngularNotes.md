# Angular - Notes
### Query1: How to apply filter in case of *ngFor ?
install this package with npm:
```
npm install w-ng5 --save
```
After, import module in app.module
```
import { PipesModule } from 'w-ng5';
```
In the next step, add in declare section of app.module:
```
imports: [
  PipesModule,
  ...
]
```
#### Some Sample Use Cases are Mentioned Below:
Filtering simple string
```
<input type="text"  [(ngModel)]="filtroString">
<ul>
  <li *ngFor="let s of getStrings() | filter:filtroString">
    {{s}}
  </li>
</ul>
```
Filtering complex string - field 'Value' in level 2
```
<input type="text"  [(ngModel)]="search">
<ul>
  <li *ngFor="let s of getComplexTypesExtends() | filter:[{field:'n1.n2.valor2', value: search}]">
    {{s.nome}} - {{s.idade}} - {{s.n1.valor1}} - {{s.n1.n2.valor2}}
  </li>
</ul>
```
Filtering complex string - middle field - 'Value' in level 1
```
<input type="text"  [(ngModel)]="search3">
<ul>
  <li *ngFor="let s of getComplexTypesExtends() | filter:[{field:'n1.valor1', value: search3}]">
    {{s.nome}} - {{s.idade}} - {{s.n1.valor1}} - {{s.n1.n2.valor2}}
  </li>
</ul>
```
Filtering complex array simple - field 'Nome' level 0
```
<input type="text"  [(ngModel)]="search2">
<ul>
  <li *ngFor="let s of getComplexTypesExtends() | filter:[{field:'nome', value: search2}]">
    {{s.nome}} - {{s.idade}} - {{s.n1.valor1}} - {{s.n1.n2.valor2}}
  </li>
</ul>
```
Filtering in tree fields - field 'Valor' in level 2 or 'Valor' in level 1 or 'Nome' in level 0
```
<input type="text"  [(ngModel)]="search5">
<ul>
  <li *ngFor="let s of getComplexTypesExtends() | filter:[{field:'n1.n2.valor2', value: search5}, {field:'n1.valor1', value: search5}, {field:'nome', value: search5}]">
    {{s.nome}} - {{s.idade}} - {{s.n1.valor1}} - {{s.n1.n2.valor2}}
  </li>
</ul>
```
This component work with infinite attribute level...

