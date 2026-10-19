<template>
  <nav class="ui-stepper" :class="[`ui-stepper--${variant}`, `ui-stepper--${orientation}`]" :aria-label="ariaLabel">
    <ol class="ui-stepper__list">
      <li
        v-for="(step, index) in steps"
        :key="step.id"
        class="ui-stepper__item"
        :class="{ 'is-active': step.id === modelValue, 'is-completed': isCompleted(step, index), 'is-disabled': step.disabled }"
      >
        <component
          :is="interactive ? 'button' : 'div'"
          class="ui-stepper__step"
          :type="interactive ? 'button' : undefined"
          :disabled="interactive ? step.disabled : undefined"
          :aria-disabled="step.disabled || undefined"
          :aria-current="step.id === modelValue ? 'step' : undefined"
          @click="selectStep(step)"
        >
          <span class="ui-stepper__indicator" aria-hidden="true">
            <svg v-if="isCompleted(step, index) && step.id !== modelValue" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="m5 12 4 4L19 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <template v-else>{{ index + 1 }}</template>
          </span>
          <span class="ui-stepper__text">
            <span v-if="variant === 'card' && orientation === 'horizontal'" class="ui-stepper__number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="ui-stepper__label">
              <slot name="label" :step="step" :index="index">{{ step.label }}</slot>
            </span>
            <span v-if="step.description" class="ui-stepper__description">{{ step.description }}</span>
          </span>
          <span v-if="isCompleted(step, index) && step.id !== modelValue" class="ui-stepper__sr-only">완료</span>
        </component>
        <svg
          v-if="orientation === 'horizontal' && variant === 'basic' && index < steps.length - 1"
          class="ui-stepper__chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type StepId = string | number;
export interface StepItem {
  id: StepId;
  label: string;
  description?: string;
  completed?: boolean;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    /** 단계 ID로 현재 단계를 제어합니다. */
    modelValue?: StepId;
    steps: StepItem[];
    variant?: 'basic' | 'line' | 'tab' | 'card' | 'minimal';
    orientation?: 'horizontal' | 'vertical';
    interactive?: boolean;
    /** completed 값이 없는 경우 현재 단계 이전을 완료로 표시합니다. */
    autoComplete?: boolean;
    ariaLabel?: string;
  }>(),
  {
    variant: 'basic',
    orientation: 'horizontal',
    interactive: true,
    autoComplete: true,
    ariaLabel: '진행 단계',
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: StepId];
  change: [value: StepId, step: StepItem];
}>();

const activeIndex = computed(() => props.steps.findIndex(step => step.id === props.modelValue));
const isCompleted = (step: StepItem, index: number) => step.completed ?? (props.autoComplete && activeIndex.value > index);

function selectStep(step: StepItem) {
  if (!props.interactive || step.disabled || step.id === props.modelValue) return;
  emit('update:modelValue', step.id);
  emit('change', step.id, step);
}
</script>

<style scoped lang="scss">
.ui-stepper {
  --stepper-primary: #4965f4;
  --stepper-soft: #eef2ff;
  --stepper-border: #dce3ef;
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  padding: 4px;
  color: #536079;
  font-size: 14px;

  &,
  * {
    box-sizing: border-box;
  }

  &__list {
    display: flex;
    width: 100%;
    min-width: max-content;
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid var(--stepper-border);
    border-radius: 10px;
    background: #fff;
  }

  &__item {
    position: relative;
    display: flex;
    flex: 1 0 150px;
    min-width: 0;
  }
  &__step {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 64px;
    margin: 0;
    padding: 16px 20px;
    border: 0;
    border-radius: 9px;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    line-height: 1.5;
  }
  button.ui-stepper__step {
    cursor: pointer;
    &:hover:not(:disabled) {
      background: var(--stepper-soft);
    }
    &:focus-visible {
      z-index: 2;
      outline: 2px solid var(--stepper-primary);
      outline-offset: 2px;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
  &__indicator {
    display: flex;
    flex: 0 0 28px;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #f0f3f7;
    color: #64748b;
    font-weight: 600;
  }
  &__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  &__label {
    font-weight: 500;
    white-space: nowrap;
  }
  &__number,
  &__description {
    font-size: 12px;
    color: #738099;
  }
  &__chevron {
    align-self: center;
    flex-shrink: 0;
    margin-right: 12px;
    color: #aab7ce;
  }
  .is-completed &__indicator,
  .is-active &__indicator {
    background: var(--stepper-primary);
    color: #fff;
  }
  .is-completed &__label {
    color: #334155;
  }
  .is-active &__label {
    color: var(--stepper-primary);
    font-weight: 700;
  }
  .is-disabled &__step {
    opacity: 0.45;
  }

  &--line {
    .ui-stepper__step {
      flex-direction: column;
      padding: 20px 16px;
      text-align: center;
    }
    .ui-stepper__indicator {
      position: relative;
      z-index: 1;
      box-shadow: 0 0 0 8px #fff;
    }
    .ui-stepper__item:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 33px;
      left: calc(50% + 22px);
      width: calc(100% - 44px);
      height: 2px;
      background: var(--stepper-border);
      pointer-events: none;
    }
    .ui-stepper__item.is-completed:not(.is-active)::after {
      background: var(--stepper-primary);
    }
  }
  &--tab {
    .ui-stepper__item + .ui-stepper__item {
      border-left: 1px solid var(--stepper-border);
    }
    .ui-stepper__step {
      border-radius: 0;
      justify-content: center;
    }
    .ui-stepper__item:first-child .ui-stepper__step {
      border-radius: 9px 0 0 9px;
    }
    .ui-stepper__item:last-child .ui-stepper__step {
      border-radius: 0 9px 9px 0;
    }
    .is-active .ui-stepper__step {
      background: var(--stepper-soft);
      box-shadow: inset 0 -3px var(--stepper-primary);
    }
  }
  &--card {
    .ui-stepper__list {
      gap: 12px;
      border: 0;
      background: transparent;
    }
    .ui-stepper__step {
      border: 1px solid var(--stepper-border);
      background: #fff;
    }
    .is-active .ui-stepper__step {
      border-color: var(--stepper-primary);
      background: var(--stepper-soft);
    }
    .is-active .ui-stepper__number {
      color: var(--stepper-primary);
    }
  }
  &--minimal {
    .ui-stepper__list { border: 0; padding: 8px; gap: 8px; }
    .is-active .ui-stepper__step { background: var(--stepper-soft); }
  }
  &--vertical {
    --stepper-success: #16a064;
    overflow-x: visible;
    .ui-stepper__list { flex-direction: column; min-width: 0; }
    .ui-stepper__item { flex: 0 0 auto; }
    .ui-stepper__step { min-height: 80px; padding: 20px 16px; gap: 12px; align-items: flex-start; }
    .ui-stepper__indicator { margin-top: 2px; }
    .ui-stepper__text { min-width: 0; gap: 4px; }
    .ui-stepper__label { white-space: normal; overflow-wrap: anywhere; font-weight: 600; }
    .ui-stepper__description { overflow-wrap: anywhere; }
    .is-completed:not(.is-active) .ui-stepper__indicator { background: var(--stepper-success); }
    &.ui-stepper--basic, &.ui-stepper--tab {
      .ui-stepper__item + .ui-stepper__item { border-left: 0; border-top: 1px solid var(--stepper-border); }
      .ui-stepper__step { border-radius: 0; justify-content: flex-start; }
      .ui-stepper__item:first-child .ui-stepper__step { border-radius: 9px 9px 0 0; }
      .ui-stepper__item:last-child .ui-stepper__step { border-radius: 0 0 9px 9px; }
      .is-active .ui-stepper__step { background: var(--stepper-soft); box-shadow: inset 3px 0 var(--stepper-primary); }
    }
    &.ui-stepper--line {
      .ui-stepper__step { flex-direction: row; text-align: left; }
      .ui-stepper__indicator { box-shadow: none; }
      .is-active .ui-stepper__indicator { box-shadow: 0 0 0 6px var(--stepper-soft); }
      .ui-stepper__item:not(:last-child)::after { top: 56px; left: 29px; width: 2px; height: calc(100% - 40px); }
      .ui-stepper__item.is-completed:not(.is-active)::after { background: var(--stepper-success); }
    }
    &.ui-stepper--card .ui-stepper__list { gap: 10px; }
  }
  &__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
}
</style>
