import { fetchData } from "@/api-calls/dashboard-data/fetchData";
import { fetchCJDCategoryList } from "@/api-calls/suppliers/cjdropshipping/fetchCJDCategoryList";
import { fetchCJDProductList } from "@/api-calls/suppliers/cjdropshipping/fetchCJDProductList";
import AllSuppliersPage from "@/components/page-components/data/suppliers/AllSuppliersPage.tsx";
import React from "react";

export default async function page({
  searchParams,
  params,
}: {
  searchParams: any;
  params: any;
}) {
  const token = searchParams.cjdAccessToken;
  const categoryId = searchParams.cjdCategoryId;
  const cjd_category_list = await fetchCJDCategoryList(token);
  const cjd_product_list = await fetchCJDProductList(token, {
    categoryId: categoryId,
    pageSize: 40,
  });
  const requested_key = "suppliers-configurations";
  const id = params.user_id;
  const type_ = searchParams.authenticationStatus;
  const auth_id = searchParams.authenticationID;
  const suppliers_configurations_response = await fetchData(
    id,
    type_,
    auth_id,
    token,
    requested_key
  );
  return (
    <div>
      <AllSuppliersPage
        suppliers_configurations_response={
          suppliers_configurations_response?.data
        }
        cjd_category_list={cjd_category_list?.data}
        cjd_product_list={cjd_product_list?.data?.list}
      />
    </div>
  );
}
