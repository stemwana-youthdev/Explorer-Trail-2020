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
  getChallenge(id: number, token?: string, profileId?: number): Observable<Challenge> {
    return this.api.getEntity(
      `Challenges/${id}${profileId ? `?profileId=${profileId}` : ''}`,
      token
    );
  }

  /**
   * Checks if answer attempt is true or false
   * @param level selected level the answer is for
   * @param answer the user's answer attempt
   */
  checkAnswer(level: ChallengeLevel, answer: string): boolean {
    return level.answer.some((a) => a.toLowerCase().trim() === answer.toLowerCase().trim());
  }

  levelCompleted(token: string, profileId: number, levelId: number, correct: boolean) {
    return this.api.levelCompleted(token, profileId, levelId, correct);
  }
}
