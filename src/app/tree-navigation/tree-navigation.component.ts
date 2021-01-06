import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Item} from '@esteco/soul/src\\soul/tree-commons/Item';
import {ItemNavigation} from '@esteco/soul/src\\soul/tree-navigation/ItemNavigation';
import {BoxNavigation} from '@esteco/soul/src\\soul/tree-navigation/BoxNavigation';
import {Box} from '@esteco/soul/src\\soul/tree-commons/Box';
import { ReService } from '../re.service';

@Component({
  selector: 'app-tree-navigation',
  templateUrl: 'tree-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TreeNavigationComponent {
  public items: Array<Item>;
  public selectedBox: Folder = new Folder();
  public selectedItem: File = new File();
  public expandedBox: Folder = new Folder();
  public label: string;
  public rootNodesExpanded: boolean[] = [true, true, true];
  public selection: Item;

  constructor(private reqService: ReService) {
    this.items = [];
    this.buildItems();
    this.selection = this.items[1];
    this.label = 'name';
  }

  public onBoxSelect(box: BoxNavigation): void {
    this.selectedBox = box.item as Folder;
    this.select(box);
  }

  public onBoxExpand(box: BoxNavigation): void {
    this.expandedBox = box.item as Folder;
  }

  public onItemSelect(item: ItemNavigation): void {
    this.selectedItem = item.item as File;
    this.select(item);
  }

  private buildItems(): void {
    const requirements = [];
    var i = 0;
    for(let req of this.reqService.requirements){
      requirements[i] = this.createEmptyBox(req.Name);
      
      for(let con of req.Constraints){
        requirements[i].children.push(this.createItem(con.Name))
      } 
      this.items.push(requirements[i]);
      i++;
    }
  }

  private createItem(name: string): File {
    const item: File = new File();
    item.name = name;
    item.type = 'file';
    return item;
  }

  private createEmptyBox(name: string): Folder {
    const box: Folder = new Folder();
    box.name = name;
    box.type = 'folder';
    box.children = [];
    return box;
  }

  private select(nav: ItemNavigation): void {
    this.selection = nav.item;
  }
}

class Folder implements Box {
  public children: Item[];
  public name: string;
  public creator: string;
  public creationDate: number;
  public childrenCount: number;
  public type: string;
  public parent: Box;

  public isBox(): boolean {
    return true;
  }
}

class File implements Item {
  public type: string;
  public name: string;
  public creationDate: number;
  public size: number;
}
