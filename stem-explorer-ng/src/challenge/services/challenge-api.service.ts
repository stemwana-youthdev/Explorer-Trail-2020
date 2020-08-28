import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Challenge, ChallengeLevel } from '../models/challenge';

@Injectable({ providedIn: 'root' })
export class ChallengeApiService {

  constructor(private api: ApiService) {}

  /**
   * Get challenge from API
   * @param id ID number for the challenge
   */
  getChallenge(id: number): Observable<Challenge> {
    return this.api.getEntity(`Challenges/${id}`);
  }

  /**
   * Checks if answer attempt is true or false
   * @param level selected level the answer is for
   * @param answer the user's answer attempt
   */
  checkAnswer(level: ChallengeLevel, answer: string): boolean {
    let result: boolean;
    level.answer.forEach((a) => result = a.toLowerCase().trim() === answer.toLowerCase().trim());
    return result;
  }
}
