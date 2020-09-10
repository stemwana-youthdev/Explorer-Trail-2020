import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
  errorMessage: string = null;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  formatEnabled: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  constructor(
    private router: Router,
    private gtmService: GoogleTagManagerService,
    private snackBar: MatSnackBar
  ) { }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);

    this.availableDevices.forEach(mediaDevice => {
      console.warn(mediaDevice)
      if (mediaDevice.label.toLowerCase().includes('back')) {
        this.currentDevice = mediaDevice;
        console.warn('selected device', this.currentDevice)
        return;
      }
    });
    this.currentDevice = devices[1] || null;
    console.warn('selected device', this.currentDevice)
  }

  toMap() {
    this.router.navigate(['/']);
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
    this.errorMessage = 'Oops! You might need to go to your settings to enable your camera or try another browser!';
  }

  scanSuccess(url: string) {
    const regex = /((https):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b\/challenge\/(\d+)/;
    const match = url.match(regex);
    if (!match) {
      this.qrCodeNotRecognized();
      return;
    }

    this.gtmTag('QR scan success');
    const challengeId = match[3];
    this.router.navigate([`challenge/${challengeId}`]);
  }

  private qrCodeNotRecognized() {
    this.gtmTag('unsuccessful QR scan');
    this.snackBar.open('QR code not recognised', null, {
      duration: 5000,
    });
  }

  /**
   * push event to the google tag manager
   * @param event string describing event
   */
  private gtmTag(event: string) {
    this.gtmService.pushTag({ event });
  }
}
