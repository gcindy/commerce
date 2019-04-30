<template>
  <div class="info pt_50">
    <el-form
      ref="productPromotion"
      :model="form"
      status-icon
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="商品分类"
        prop="pass"
      >
        <el-cascader
          :options="productCateOptions"
          v-model="form.selectedOptions"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input v-model.number="form.age"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌">
        <el-select
          v-model="value"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品介绍">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品货号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品售价">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="市场价">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="计量单位">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品重量">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="medium"
          @click="handleNext('productInfoForm')"
        >下一步，填写商品促销</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import show from "@/js/show";
export default {
  data() {
    return {
      form: {
        selectedOptions: [],
        options: [],
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      productCateOptions: [
        {
          value: "fuzhuang",
          label: "服装",
          children: [
            {
              value: "coat",
              label: "外套"
            },
            {
              value: "T-shirt",
              label: "T恤"
            },
            {
              value: "pants",
              label: "休闲裤"
            },
            {
              value: "jeans",
              label: "牛仔裤"
            },
            {
              value: "shirt",
              label: "衬衫"
            },
            {
              value: "shoes",
              label: "男鞋"
            }
          ]
        },
        {
          value: "shuma",
          label: "手机数码",
          children: [
            {
              value: "Mobile Communications",
              label: "手机通讯"
            },
            {
              value: "Mobile phone accessories",
              label: "手机配件"
            },
            {
              value: "Photography",
              label: "摄影摄像"
            },
            {
              value: "Media entertainment",
              label: "影音娱乐"
            },
            {
              value: "Digital Accessories",
              label: "数码配件"
            },
            {
              value: "smart device",
              label: "智能设备"
            }
          ]
        },
        {
          value: "dianqi",
          label: "家用电器",
          children: [
            {
              value: "TV",
              label: "电视"
            },
            {
              value: "air conditioning",
              label: "空调"
            },
            {
              value: "washing machine",
              label: "洗衣机"
            },
            {
              value: "refrigerator",
              label: "冰箱"
            },
            {
              value: "Kitchen size",
              label: "厨卫大小"
            },
            {
              value: "Kitchen electric",
              label: "厨房小电"
            },
            {
              value: "home devices",
              label: "生活电器"
            },
            {
              value: "Health care",
              label: "个护健康"
            }
          ]
        },
        {
          value: "jiazhuang",
          label: "家居家装",
          children: [
            {
              value: "Kitchen bathroom",
              label: "厨房卫浴"
            },
            {
              value: "Lighting",
              label: "灯饰照明"
            },
            {
              value: "hardware tools",
              label: "五金工具"
            },
            {
              value: "Bedroom Furniture",
              label: "卧室家具"
            },
            {
              value: "Living Room Furniture",
              label: "客厅家具"
            }
          ]
        },
        {
          value: "cars",
          label: "汽车用品",
          children: [
            {
              value: "Brand new vehicle",
              label: "全新整车"
            },
            {
              value: "Car electrical appliance",
              label: "车载电器"
            },
            {
              value: "Maintenance",
              label: "维修保养"
            },
            {
              value: "Car decoration",
              label: "汽车装饰"
            }
          ]
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  methods: {
    handleNext(formName) {
      console.log("nextStep:" + formName);
      this.$emit("nextStep");
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     this.$emit("nextStep");
      //   } else {
      //     this.$message({
      //       message: "验证失败",
      //       type: "error",
      //       duration: 1000
      //     });
      //     return false;
      //   }
      // });
    }
  }
};
</script>

<style lang="less">
.el-input {
  width: 490px;
}
</style>
