<template>
  <div class="password-strength-checker">
    <div class="strength-bar">
      <div
        class="strength-progress"
        :style="{ width: `${strengthPercentage}%` }"
        :class="strengthClass"
      ></div>
    </div>
    <p class="strength-text" :class="strengthClass">
      Password strength: {{ strengthText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  password: string;
}>();

const strengthPercentage = computed(() => {
  const { password } = props;
  let score = 0;

  if (password.length > 0) score += 5;
  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 20;
  if (password.length >= 16) score += 20;
  if (password.length >= 20) score += 20;

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[^a-zA-Z\d]/.test(password);

  const complexityScore =
    (hasLowercase ? 5 : 0) +
    (hasUppercase ? 5 : 0) +
    (hasDigit ? 5 : 0) +
    (hasSpecialChar ? 5 : 0);

  score +=
    password.length >= 8 ? complexityScore : Math.floor(complexityScore / 2);

  const uniqueChars = new Set(password).size;
  score += Math.min(15, uniqueChars);

  if (password.length < 8) {
    score = Math.min(score, 35);
  } else if (password.length < 12) {
    score = Math.min(score, 60);
  }

  return Math.min(100, score);
});

const strengthText = computed(() => {
  const strength = strengthPercentage.value;
  if (strength === 0) return 'Very Weak';
  if (strength <= 25) return 'Weak';
  if (strength <= 50) return 'Medium';
  if (strength <= 75) return 'Strong';
  return 'Very Strong';
});

const strengthClass = computed(() => {
  const strength = strengthPercentage.value;
  if (strength <= 25) return 'weak';
  if (strength <= 50) return 'medium';
  if (strength <= 75) return 'strong';
  return 'very-strong';
});
</script>

<style scoped lang="scss">
.password-strength-checker {
  margin-top: 5px;
}

.strength-bar {
  height: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.strength-progress {
  height: 100%;
  transition: width 0.3s ease;
}

.strength-text {
  font-size: 12px;
}

.weak {
  color: #dc3545;

  &.strength-progress {
    background-color: #dc3545;
  }
}
.medium {
  color: #ffa700;

  &.strength-progress {
    background-color: #ffa700;
  }
}
.strong {
  color: #a3c725;

  &.strength-progress {
    background-color: #a3c725;
  }
}
.very-strong {
  color: #00b300;

  &.strength-progress {
    background-color: #00b300;
  }
}
</style>
