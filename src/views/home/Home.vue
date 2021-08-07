<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/nvabar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeGoods, getHomeMultiData} from "@/network/home";
import {debounce} from "@/assets/img/common/utils";


export default {
  name: "Home",
  components: {
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    Scroll,
    BackTop

  },
  data() {
    return {
      banners: [],
      // dKeyword: [],
      // keywords: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      curType: 'pop',
      isShow: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.curType].list;
    }
  },
  created() {
    //1.请求轮播图热点推荐数据
    this.getHomeMultiData();
    //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
    //3.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on('itemImageLoad', () => {
      refresh();
    });
  },
  methods: {
    /**
     * 事件监监听相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.curType = 'pop';
          break;
        case 1:
          this.curType = 'new';
          break;
        case 2:
          this.curType = 'sell';
          break;

      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShow = (-position.y) > 1000;
    },
    loadMore() {
      this.getHomeGoods(this.curType);
    },

    /**
     * 网络请求相关
     */
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;

      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp();
      }).catch(err => {
        console.log(err, type)
      });
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  /*position: relative;*/
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  height: calc(100% - 49px);
  overflow: hidden;
}

/*.content {*/
/*  overflow: hidden;*/
/*  position: absolute;*/
/*  top: 44px;*/
/*  bottom: 49px;*/
/*  left: 0;*/
/*  right: 0;*/
/*}*/
</style>
