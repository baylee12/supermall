<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
  </div>
</template>

<script>
import NavBar from "@/components/common/nvabar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import {getHomeMultiData} from "@/network/home";


export default {
  name: "Home",
  components: {
    FeatureView,
    HomeSwiper,
    NavBar,
    RecommendView

  },
  data() {
    return {
      banners: [],
      // dKeyword: [],
      // keywords: [],
      recommends: []
    }
  },
  created() {
    //1.请求多个数据
    getHomeMultiData().then(res => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;
}
</style>
