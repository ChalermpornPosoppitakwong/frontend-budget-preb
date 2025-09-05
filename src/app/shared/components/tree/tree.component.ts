import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, OnInit } from '@angular/core';
import { Checkbox } from "../checkbox/checkbox";
import { FormsModule } from '@angular/forms';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule, FormsModule, Checkbox, Icon],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class Tree implements OnInit {
  @Input() data: {
    label: string;
    children?: any[];
    expanded?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    parent?: any;
  }[] = [];

  @Input() level = 0; // 0 = root
  @Input() hideCheckbox: boolean = false;
  @Input() parent?: any;
  @Input() treeNodeTpl?: TemplateRef<any>;
  @Input() align: 'start' | 'center' | 'end' = 'start';

  @Output() selectionChange = new EventEmitter<any>();

  ngOnInit() {
    this.initTree(this.data);
  }

  private initTree(nodes: any[]): boolean {
    let anyChildChecked = false;

    for (const node of nodes) {
      let childChecked = false;

      if (node.children?.length) {
        childChecked = this.initTree(node.children); // recursive
        const allChecked = node.children.every((c: any) => c.checked);
        const noneChecked = node.children.every((c: any) => !c.checked && !c.indeterminate);

        node.checked = allChecked;
        node.indeterminate = !allChecked && !noneChecked;

        if (childChecked) {
          node.expanded = true;
        }
      }

      if (node.checked) {
        childChecked = true;
      }

      anyChildChecked = anyChildChecked || childChecked;
    }

    return anyChildChecked;
  }

  toggle(node: any) {
    node.expanded = !node.expanded;
  }

  private setChildrenChecked(children: any[], checked: boolean) {
    for (const child of children) {
      child.checked = checked;
      child.indeterminate = false;
      if (child.children?.length) {
        this.setChildrenChecked(child.children, checked);
      }
    }
  }

  toggleCheck(node: any, checked: boolean, parent?: any) {
    node.checked = checked;
    node.indeterminate = false;

    if (node.children?.length) {
      this.setChildrenChecked(node.children, checked);
    }

    // ขยายหรือย่อ node ตาม checkbox
    node.expanded = checked;

    if (parent) {
      this.updateParentCheck(parent);
    }

    this.selectionChange.emit(node);
  }

  private updateParentCheck(node: any) {
    if (!node.children?.length) return;

    const allChecked = node.children.every((c: any) => c.checked);
    const noneChecked = node.children.every((c: any) => !c.checked && !c.indeterminate);

    node.checked = allChecked;
    node.indeterminate = !allChecked && !noneChecked;

    if (node.parent) {
      this.updateParentCheck(node.parent);
    }
  }
}
