import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class ChallengeApiService {

  constructor(private api: ApiService) {}

  getChallenge(id: number) {
    this.api.getEntity(`Challenges/${id}`);
  }
}
