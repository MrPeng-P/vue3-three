<script lang="ts">
import HTTP from "@/request/axios";
export default {
  setup() {
    const size = ref(2);
    const allMethods = {
      /**
       * @desc 拆分
       * @param
       * @return
       * @author ppc
       * @date 2023-05-25 14:52:00
       */
      toSplit: () => {
        const file1: any = document.getElementById("file1");
        const files: any = file1?.files;
        const file = files[0];
        const uploadSize = 1024 * size.value;
        const arr = [];
        for (let i = 0; i < file.size; i += uploadSize) {
          let t: any = i / uploadSize;
          const index = parseInt(t) + 1;
          arr.push(file.slice(i, uploadSize * index));
        }
        console.log("文件切片", arr);
        allMethods.downloadFiles(arr, file.name);
      },
      /**
       * @desc 合并
       * @param
       * @return
       * @author ppc
       * @date 2023-05-25 14:53:23
       */
      merge: () => {
        const file2: any = document.getElementById("file2");
        const files: any = file2?.files;
        const arr = [...files].map((v) => {
          return v.slice(0, v.size);
        });
        console.log("%c ..........arr.........", "color:#31ef0e", arr);
        const name = files[0].name.replace(/-\d+$/, "");
        const file = new File(arr, name);
        allMethods.downloadFile(file, file.name);
      },
      downloadFiles: (arr: any, name: any) => {
        arr.forEach((v: any, i: any) => {
          allMethods.downloadFile(v, name + "-" + i);
        });
      },
      downloadFile: (v: any, name: any) => {
        const a = document.createElement("a");
        a.setAttribute("download", name);
        a.href = URL.createObjectURL(v);
        a.click();
      },
      gptFile() {
        fetch("./glb/Island.glb")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch glTF file");
            }
            return response.arrayBuffer();
          })
          .then((arrayBuffer) => {
            const gltfData = new Uint8Array(arrayBuffer);
            // 处理 glTF 文件内容
          })
          .catch((error) => {
            console.error("Error fetching glTF file:", error);
          });
      },
    };
    onMounted(() => {
      allMethods.gptFile();
    });
    return {
      size,
      ...allMethods,
    };
  },
};
</script>

<template>
  <el-input v-model="size"></el-input>
  <div>
    <input type="file" id="file1" />
    <el-button @click="toSplit" id="btn1">拆分</el-button>
  </div>
  <br />
  <div>
    <input type="file" multiple id="file2" />
    <el-button @click="merge" id="btn2">合并</el-button>
  </div>
</template>
<style scoped></style>
