<template>
    <div>
      <div>
        <div>
          <!-- List -->
          <section class="">
            <div class="mt-3 other--tables">
              <div class="table-responsive">
                <table class="table table-centered table-nowrap mb-0">
                  <thead>
                    <tr>
                        <th scope="col"> </th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th scope="col">Type</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                     
                    <tr
                      v-for="item in users.data"
                      :key="item.id"
                    >
                      <td> <img style="border-radius:50%; width:30px; height:30px; object-fit: cover; object-position: center;" :src=' item.photo == null ? "/no-user.png" : config.imgUrl +item.photo ' alt=""> </td>
                      <td class="text-capitalize">{{ item.first_name + " " + item.last_name }}</td>
                      <td>{{ item.email }}</td>
                      <td class="text-capitalize">
                        {{ item.role }}
                      </td>
                      <td class="text-capitalize">
                        {{ item.type }}
                      </td>
                      <td>
                        <span :class="item.status">{{ item.status }}</span>
                      </td>
                      <td class="" style="color:var(--primary-color)" > 
                            <div role="button" @click="goToUser(item)">
                                <span>More</span> 
                                <span> &gt; </span>
                            </div>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
    import config from "@/config/api"
  import { timeStamp2 } from "@/plugins/filter";
  export default {
      data() {
          return {
                config,
                timeStamp2,
                delete_confirm: false,
                product_id: ""
          };
      },
      methods: {
        goToUser(item) {
              this.$router.push({ name: "user-detail", params: { id: item.id } });
          },
      },
      computed: {
          users() {
              return this.$store.getters["users/allUsers"];
          },
      },
  };
  </script>