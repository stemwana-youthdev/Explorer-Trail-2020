import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { Content } from '../../shared/models/content.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(
    private urlService: UrlService,
    private http: HttpClient
  ) {}

  /**
   * returns all custom content
   */
  getAllContent(): Observable<Content[]> {
    const url = this.urlService.content();
    return this.http.get<Content[]>(url);
  }

  getContentItem(uid: string): Observable<Content> {
    const url = `${this.urlService.content}/${uid}`;
    return this.http.get<Content>(url);
  }

  putContent(content: Content): Observable<Content> {
    const url = this.urlService.content();
    return this.http.put<Content>(url, content);
  }
}
