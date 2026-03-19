<template>
  <z-row :gutter="12" class="mb-3">
    <z-col :span="8">
      <div class="grid-content ep-bg-purple">8</div>
    </z-col>
    <z-col :span="8">
      <div class="grid-content ep-bg-purple-light">8</div>
    </z-col>
    <z-col :span="8">
      <div class="grid-content ep-bg-purple">8</div>
    </z-col>
  </z-row>
  <z-row :gutter="12" class="mb-3">
    <z-col :span="6">
      <div class="grid-content ep-bg-purple-light">6</div>
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple">6</div>
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple-light">6</div>
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple">6</div>
    </z-col>
  </z-row>
  <z-row :gutter="12">
    <z-col :span="16">
      <div class="grid-content ep-bg-purple">16</div>
    </z-col>
    <z-col :span="8">
      <div class="grid-content ep-bg-purple-light">8</div>
    </z-col>
  </z-row>
</template>

<style scoped>
.grid-content {
  align-items: center;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  min-height: 36px;
}

.ep-bg-purple-dark {
  background: #99a8bf;
}

.ep-bg-purple {
  background: #d3dce6;
}

.ep-bg-purple-light {
  background: #e5e9f2;
}
</style>
