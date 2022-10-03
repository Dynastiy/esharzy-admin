<template>
    <div>
      <div>
        <div>
          <div class="d-flex justify-content-between flex-wrap" style="gap: 20px">
            <div>
              <h4 class="text-dark font-weight-bold">Customers</h4>
              <p class="small">
                All registered customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
      data() {
          return {
                delete_confirm: false,
                product_id: ""
          };
      },
      methods: {
          viewProduct(data) {
              this.$router.push({ name: "vendor-product-detail", params: { slug: data.slug } });
          },
      },
      computed: {
          
      },
  };
  </script>