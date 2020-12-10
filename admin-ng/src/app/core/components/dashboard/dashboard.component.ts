import { Component, OnInit } from '@angular/core';
import { Stats } from 'src/app/shared/models/stats.model';
import { ApiService } from 'src/app/shared/services/api.service';

interface Link {
  link: string[];
  name: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  links: Link[] = [
    { link: ['/locations'], name: 'Locations', icon: 'explore' },
    { link: ['/challenges'], name: 'Challenges', icon: 'assignment_turned_in' },
    { link: ['/external-content'], name: 'External Content', icon: 'description' },
  ];
  stats: Stats;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getStats().subscribe((stats) => (this.stats = stats));
  }
}
