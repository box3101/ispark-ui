import type {InjectionKey, Ref} from 'vue'

export type IllustrationStyle = 'illustrated' | 'flat'
export const illustrationStyleKey: InjectionKey<Readonly<Ref<IllustrationStyle>>> = Symbol('presentation-illustration-style')
