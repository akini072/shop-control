<template>
  <div>
    <v-btn @click="$emit('clicked')" :class="['text-button', 'pb-1', colorText]" :color="color" :outlined="border">{{ text }}</v-btn>
  </div>
</template>

<script src="./script.js" />