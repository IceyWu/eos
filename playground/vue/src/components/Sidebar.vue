<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h1 class="logo">Eos UI</h1>
      <p class="version">v1.0.0</p>
    </div>

    <nav class="nav-menu">
      <div class="nav-section">
        <div class="nav-section-title">Components</div>
        <a href="#carousel" class="nav-item" :class="{ active: activeSection === 'carousel' }">
          <span class="nav-icon">🎠</span>
          <span>Carousel</span>
        </a>
        <a href="#button" class="nav-item" :class="{ active: activeSection === 'button' }">
          <span class="nav-icon">🔘</span>
          <span>Button</span>
        </a>
      </div>

      <div class="nav-section">
        <div class="nav-section-title">Examples</div>
        <a href="#media-carousel" class="nav-item" :class="{ active: activeSection === 'media-carousel' }">
          <span class="nav-icon">🎬</span>
          <span>Media Carousel</span>
        </a>
        <a href="#interactive" class="nav-item" :class="{ active: activeSection === 'interactive' }">
          <span class="nav-icon">⚡</span>
          <span>Interactive</span>
        </a>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="tech-stack">
        <span class="tech-badge">Vue 3</span>
        <span class="tech-badge">TypeScript</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
	activeSection?: string;
}>();
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 100;
}

.sidebar-header {
  padding: 32px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.version {
  font-size: 12px;
  color: #94a3b8;
  margin: 4px 0 0 0;
}

.nav-menu {
  flex: 1;
  padding: 24px 0;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 32px;
}

.nav-section-title {
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 24px;
  margin-bottom: 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 10px 24px;
  color: #64748b;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: #f8fafc;
  color: #667eea;
}

.nav-item.active {
  background: #f1f5f9;
  color: #667eea;
  border-left-color: #667eea;
}

.nav-icon {
  margin-right: 12px;
  font-size: 18px;
}

.sidebar-footer {
  padding: 24px;
  border-top: 1px solid #e2e8f0;
}

.tech-stack {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tech-badge {
  font-size: 11px;
  padding: 4px 10px;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 4px;
  font-weight: 500;
}
</style>
