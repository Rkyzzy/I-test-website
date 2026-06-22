---
title: "Rust 系统编程入门：所有权、生命周期与并发"
date: "2024-02-20"
tags: ["Rust", "系统编程", "后端"]
category: "技术"
cover: "https://picsum.photos/seed/rust/1200/600"
excerpt: "Rust 是一门强调安全、并发和性能的系统编程语言。本文从所有权模型开始带你理解 Rust 的核心概念。"
readTime: 10
---

## Rust 的设计哲学

Rust 的目标是在不牺牲性能的前提下提供内存安全保证。

## 所有权机制

所有权是 Rust 最独特的概念。

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    println!("{}", s2);
}
```
