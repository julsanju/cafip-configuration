import { Component, computed, effect, signal } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  private readonly label = signal<string | null>(null);
  currentLabel = computed(() => this.label());

  constructor(private router: Router, private route: ActivatedRoute) {
    effect(() => {
      this.updateFromRoute();
    });
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => this.updateFromRoute());
  }

  private updateFromRoute(): void {
    let child = this.route.firstChild;
    while (child?.firstChild) {
      child = child.firstChild;
    }
    const breadcrumb = child?.snapshot.data?.['breadcrumb'] as string | undefined;
    this.label.set(breadcrumb ?? null);
  }
}


