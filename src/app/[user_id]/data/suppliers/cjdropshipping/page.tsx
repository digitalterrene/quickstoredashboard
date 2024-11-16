import { fetchCJDCategoryList } from "@/api-calls/suppliers/cjdropshipping/fetchCJDCategoryList";
import { fetchCJDProductList } from "@/api-calls/suppliers/cjdropshipping/fetchCJDProductList";
import CJDropshippingPage from "@/components/page-components/data/suppliers/CJDropshippingPage";
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
  return (
    <div>
      <CJDropshippingPage
        cjd_category_list={cjd_category_list?.data || []}
        cjd_product_list={cjd_product_list?.data?.list || []}
      />
    </div>
  );
}
