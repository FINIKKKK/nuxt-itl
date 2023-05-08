<template>
  <NuxtLayout name="main">
    <div class="body">
      <template v-for="obj in post?.body" :key="obj.id">
        <!-- paragraph -->
        <p
          v-if="obj.type === 'paragraph'"
          class="el text"
          v-html="obj.data.text"
        ></p>

        <!-- list -->
        <ul
          v-else-if="obj.type === 'list'"
          class="el list"
          :class="{ ordered: obj.data.style === 'ordered' }"
        >
          <li v-for="(item, index) in obj.data.items" :key="index">
            {{ item }}
          </li>
        </ul>

        <!-- delimeter -->
        <div v-else-if="obj.type === 'delimiter'" class="el delimiter">***</div>

        <!-- headers -->
        <h6
          v-else-if="obj.type === 'header' && obj.data.level === 6"
          class="title"
        >
          {{ obj.data.text }}
        </h6>
        <h5
          v-else-if="obj.type === 'header' && obj.data.level === 5"
          class="title"
        >
          {{ obj.data.text }}
        </h5>
        <h4
          v-else-if="obj.type === 'header' && obj.data.level === 4"
          class="title"
        >
          {{ obj.data.text }}
        </h4>
        <h3
          v-else-if="obj.type === 'header' && obj.data.level === 3"
          class="title"
        >
          {{ obj.data.text }}
        </h3>
        <h2
          v-else-if="obj.type === 'header' && obj.data.level === 2"
          class="title"
        >
          {{ obj.data.text }}
        </h2>
        <h1
          v-else-if="obj.type === 'header' && obj.data.level === 1"
          class="title"
        >
          {{ obj.data.text }}
        </h1>

        <!-- codebox -->
        <div v-else-if="obj.type === 'codeBox'" class="el code">
          <div class="code__lg">
            {{ obj.data.language !== "Auto-detect" ? obj.data.language : " " }}
          </div>
          <code v-html="obj.data.code"></code>
        </div>

        <!-- quote -->
        <div v-else-if="obj.type === 'quote'" class="el quote">
          <svg width="20" height="20">
            <use xlink:href="../img/icons/icons.svg#quote"></use>
          </svg>
          <div class="quote__content">
            <h3>{{ obj.data.text }}</h3>
            <p>{{ obj.data.caption }}</p>
          </div>
        </div>

        <!-- image -->
        <div v-else-if="obj.type === 'image'" class="el img">
          <img :src="obj.data.file.url" alt="img" />
        </div>
      </template>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Api } from "~/api";

definePageMeta({
  layout: false,
});

const route = useRoute();
const { data: post } = useAsyncData(async () => {
  const id = route.params.id;
  const post = await Api().post.getOne(Number(id));
  return post;
});
</script>

<style lang="scss" scoped>
.body {
  font-size: 16px;
  line-height: 23px;
  .el:not(:last-child) {
    margin-bottom: 15px;
  }
  b {
    font-weight: 700;
  }
  i {
    font-style: italic;
  }
  code {
    background-color: $blue4;
    padding: 15px 10px !important;
    width: 100%;
    display: block;
  }
  .list {
    counter-reset: list;
    li {
      padding-left: 40px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        left: 12px;
        top: 7.5px;
        background-color: #fff;
        border-radius: 50%;
      }
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    &.ordered {
      li {
        &::before {
          counter-increment: list;
          content: counter(list) ".";
          width: auto;
          height: auto;
          background: none;
          top: 1px;
          left: 12px;
          font-size: 16px;
        }
      }
    }
  }
  .delimiter {
    font-size: 40px;
    line-height: 40px;
    text-align: center;
    letter-spacing: 10px;
    margin-top: 25px;
  }
  .title {
    font-weight: 700;
  }
  h1.title {
    font-size: 45px;
    line-height: 50px;
  }
  h2.title {
    font-size: 38px;
    line-height: 42px;
  }
  h3.title {
    font-size: 32px;
    line-height: 36px;
  }
  h4.title {
    font-size: 26px;
    line-height: 32px;
  }
  h5.title {
    font-size: 20px;
    line-height: 28px;
  }
  h6.title {
    font-size: 16px;
    line-height: 26px;
  }
  .code {
    padding: 55px 15px 10px;
    position: relative;
    overflow: hidden;
    code {
      padding: 0 !important;
      padding-bottom: 15px !important;
    }
    code div {
      background-color: $black !important;
    }
    .code__lg {
      position: absolute;
      top: 0;
      left: 0;
      padding: 5px 15px;
      background-color: #352b49;
      width: 100%;
      font-size: 14px;
    }
  }
  .quote {
    display: flex;
    align-items: flex-start;
    svg {
      fill: $gray;
      width: 25px;
      margin-right: 20px;
    }
    .quote__content {
      width: 100%;
    }
    h3 {
      font-style: italic;
    }
    p {
      color: $gray;
      text-align: right;
      font-weight: 700;
    }
  }
  .img {
    width: 100%;
    img {
      border-radius: 10px;
      max-width: 100%;
      max-height: 500px;
      object-fit: cover;
    }
  }
  code {
    font-size: 14px !important;
    overflow: auto !important;
    border-radius: 10px;
    padding: 10px 15px !important;
    font-family: "Consolas";
    &::-webkit-scrollbar {
      display: block !important;
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #2e2542;
      border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }
  table,
  td {
    * {
      cursor: default !important;
    }
    padding: 0 !important;
    background-color: transparent !important;
    font-size: 14px !important;
    line-height: 16px !important;
  }
}
</style>
