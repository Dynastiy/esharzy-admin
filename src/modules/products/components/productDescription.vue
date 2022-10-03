<template>
    <div>
        <div>
            <div>
                <div class="mt-3">
                <!-- <label for="">Product Description</label> -->
                <vue-editor
                    disabled
                    v-model="product.description"
                    :editor-toolbar="customToolbar"
                ></vue-editor>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    components:{
        VueEditor
    },
    data(){
        return {
            customToolbar: [
          [{ header: [false, 1, 2, 3, 4, 5, 6] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ script: "sub" }, { script: "super" }],
        ],
        }
    },
    computed: {
        product(){
            return this.$store.getters['products/singleProduct']
        }
    }
}
</script>