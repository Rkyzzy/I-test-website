---
title: "前端设计模式实战：从观察者到策略模式"
date: "2024-01-10"
tags: ["设计模式", "前端", "架构"]
category: "技术"
cover: "https://picsum.photos/seed/design/1200/600"
excerpt: "设计模式是软件开发中经过验证的解决方案。本文探讨了在前端开发中如何应用观察者模式、策略模式、工厂模式等经典设计模式。"
readTime: 12
---

## 为什么前端需要设计模式

很多人认为设计模式是后端开发的专利，实际上在前端开发中，设计模式同样重要。

## 观察者模式

Vue 的响应式系统本质上就是观察者模式的实现。

```typescript
class EventBus {
  private listeners: Map<string, Function[]> = new Map()

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  emit(event: string, ...args: any[]) {
    this.listeners.get(event)?.forEach(cb => cb(...args))
  }
}
```

## 策略模式

策略模式允许在运行时选择算法的行为。

## 工厂模式

当需要根据条件创建不同类型的对象时，工厂模式非常有用。
