import { useAppSelector } from "app/redux/hooks";
import { selectUser } from "app/redux/slices/userSlice";
import React, { useCallback, useEffect, useState } from "react";
import {
  useAddMutation,
  useGetWishlistQuery,
  useRemoveMutation,
} from "app/api/wishlistApi";
import { USERTYPES } from "app/types";
import wishListSlice, { selectWishList } from "app/redux/slices/wishlistSlice";
import { useAppDispatch } from "./reduxhooks";
import { useRouter } from "next/router";
import useNotify from "./useNotify";

type List = Record<string, any>;

const useWishList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter()
  const notify = useNotify()
  const { data, isLoading, isError } = useGetWishlistQuery(
    { studentId: user.id as string },
    { skip: user.roleName?.toLowerCase() !== USERTYPES.STUDENT.toLowerCase() }
  );
  const wishlist: List = useAppSelector(selectWishList);

  const [add] = useAddMutation();
  const [remove] = useRemoveMutation();

  const addToWishList = useCallback(
    async (courseId: string) => {
      if (!wishlist[courseId]) {
        const res = await add({ courseId, studentId: user.id as string });

        //@ts-ignore
        if (res?.error && res.error?.status === 401) {
          router.push('/auth/login')
          notify({ type: 'error', title: 'Not Authorized', description: 'You need to be logged in to add a course to your wishlist' })
        }
      }
    },
    [add, user?.id, wishlist]
  );

  const removeFromWishList = useCallback(
    async (courseId: string) => {
      if (wishlist[courseId]) {
        const res = remove({ courseId, studentId: user.id as string });

        //@ts-ignore
        if (res?.error && res.error?.status === 401) {
          router.push('/auth/login')
          notify({ type: 'error', title: 'Not Authorized', description: 'You need to be logged in to remove a course from your wishlist' })
        }

      }
    },
    [remove, user?.id, wishlist]
  );

  useEffect(() => {
    if (data?.data.pagedList.length && !isLoading) {
      const wishList = data.data.pagedList.reduce((list: List, course) => {
        list[course.courseId] = true;

        return list;
      }, {});
      dispatch(wishListSlice.actions.setWishList(wishList as any));
    }
  }, [data, isLoading, dispatch]);

  return {
    wishlist,
    addToWishList,
    removeFromWishList,
  };
};

export { useWishList };

//
