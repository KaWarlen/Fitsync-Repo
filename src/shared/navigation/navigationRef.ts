import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const MAX_RESET_ATTEMPTS = 20;
const RESET_DELAY_MS = 100;

const resetToLoginInternal = (attempt = 0): void => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    return;
  }

  if (attempt < MAX_RESET_ATTEMPTS) {
    setTimeout(() => resetToLoginInternal(attempt + 1), RESET_DELAY_MS);
  }
};

export const resetToLogin = (): void => {
  resetToLoginInternal();
};
