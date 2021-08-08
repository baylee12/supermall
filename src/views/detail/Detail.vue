<template>
  <div id="detail">
    <!--导航栏-->
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <detail-recommend-info :recommend-list="recommendList"/>
    </scroll>

  </div>
</template>

<script>

import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailRecommendInfo from "@/views/detail/childComps/DetailRecommendInfo";

import BScroll from "better-scroll";

import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "@/network/detail";
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    BScroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      const data = res.result;
      //1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      //3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);
      //4.保存商品详情数据
      this.detailInfo = data.detailInfo;
      //5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      //6.保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      console.log(res);
    });
    getRecommend().then(res => {
      this.recommendList = res.data.list
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    imgLoad() {
      console.log('imgLoad');
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}


.content {
  height: calc(100% - 44px);
}
</style>
