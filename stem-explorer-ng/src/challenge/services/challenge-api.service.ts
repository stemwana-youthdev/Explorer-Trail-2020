import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { Challenge, ChallengeLevel } from '../models/challenge';

@Injectable({ providedIn: 'root' })
export class ChallengeApiService {

  constructor(private api: ApiService, private domSanitizer: DomSanitizer) {}

  /**
   * Get challenge from API
   * @param id ID number for the challenge
   */
  getChallenge(id: number, token?: string, profileId?: number): Observable<Challenge> {
    return this.api.getEntity(
      `Challenges/${id}${profileId ? `?profileId=${profileId}` : ''}`,
      token
    ).pipe(
      // Mark the video embed urls as being safe to use in iframes
      tap((challenge: Challenge) => {
        if (challenge?.challengeLevels) {
          for (const level of challenge.challengeLevels) {
            level.videoEmbedUrl =
              level.videoEmbedUrl &&
              this.domSanitizer.bypassSecurityTrustResourceUrl(
                level.videoEmbedUrl as string
              );
          }
        }
      }),
    );
  }

  /**
   * Checks if answer attempt is true or false
   * @param level selected level the answer is for
   * @param answer the user's answer attempt
   */
  checkAnswer(level: ChallengeLevel, answer: string) {
    return this.api.validateAnswer(level.id, answer);
  }

  levelCompleted(token: string, profileId: number, levelId: number, correct: boolean) {
    return this.api.levelCompleted(token, profileId, levelId, correct);
  }
}
