import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from './button/button';
import { Icon } from './icon/icon';
import { Table } from './table/table';
import { Select } from './select/select';
import { InputComponent } from './input/input';
import { Textarea } from './textarea/textarea';
import { Checkbox } from './checkbox/checkbox';
import { Radio } from './radio/radio';
import { MenuItem } from './menu-item/menu-item';
import { Row } from './row/row';
import { Col } from './col/col';
import { Tree } from './tree/tree.component';
import { Dropdown } from './dropdown/dropdown.component';
import { CheckboxGroup } from './checkbox/checkbox-group';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Button,
    Icon,
    Table,
    Select,
    InputComponent,
    Textarea,
    Checkbox,
    Radio,
    MenuItem,
    Row,
    Col,
    Tree,
    Dropdown,
    CheckboxGroup
  ],
  exports: [Button, Icon, Table, Select, InputComponent, Textarea, Checkbox, Radio, MenuItem, Row, Col, Tree, Dropdown, CheckboxGroup]
})
export class ComponentsModule { }
