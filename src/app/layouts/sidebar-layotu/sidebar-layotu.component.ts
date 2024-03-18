import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
    selector: 'app-sidebar-layotu',
    standalone: true,
    templateUrl: './sidebar-layotu.component.html',
    styleUrl: './sidebar-layotu.component.scss',
    imports: [RouterOutlet, SidebarComponent]
})
export class SidebarLayotuComponent {}
