import Link from "next/link";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { useCookie } from "../useCookie";
import styles from "../../styles/purchase.module.css";
import { useRouter } from "next/router";

const PurchaseConfirmation = ({ imageData, imageDataB }: any) => {
  const cookieName = useCookie();
  const router = useRouter();
  const { getValues } = useFormContext();
  const values = getValues();

  const handleSubmitUsedItemValue = async (e: any) => {
    e.preventDefault();

    const date = new Date();
    const today: string = date.toLocaleDateString();

    const values = getValues();

    fetch("/api/usedItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reception_date: today,
        user_id: cookieName,
        seller_last_name: values.lastName,
        seller_first_name: values.firstName,
        seller_kana_last_name: values.kanaFirstName,
        seller_kana_first_name: values.kanaLastName,
        seller_phone: values.phone,
        seller_email: values.email,
        seller_zip_code: values.zipCode,
        seller_prefecture: values.prefecture,
        seller_city: values.city,
        seller_address: values.address,
        seller_building: values.building,
        item_name: values.itemName,
        item_code: values.itemCode,
        item_size: values.itemSize,
        item_color: values.itemColor,
        item_note: values.itemNote,
        status: "受付済",
      }),
    });

    if (values.itemNameB) {
      fetch(`${process.env.NEXT_PUBLIC_API}/api/usedItems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reception_date: today,
          user_id: cookieName,
          seller_last_name: values.lastName,
          seller_first_name: values.firstName,
          seller_kana_last_name: values.kanaFirstName,
          seller_kana_first_name: values.kanaLastName,
          seller_phone: values.phone,
          seller_email: values.email,
          seller_zip_code: values.zipCode,
          seller_prefecture: values.prefecture,
          seller_city: values.city,
          seller_address: values.address,
          seller_building: values.building,
          item_name: values.itemNameB,
          item_code: values.itemCodeB,
          item_size: values.itemSizeB,
          item_color: values.itemColorB,
          item_note: values.itemNoteB,
        }),
      });
    }
    router.push("/");
  };

  return (
    <div className={styles.outside}>
      <form onSubmit={handleSubmitUsedItemValue}>
        <h1 className={styles.midashi}>入力内容を確認してください</h1>
        <h2 className={styles.kaitori}>お客様情報の確認</h2>
        <hr />
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>氏名
          </span>
          {values.lastName}&nbsp;
          {values.firstName}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>氏名（フリガナ）
          </span>
          {values.kanaLastName}&nbsp;
          {values.kanaFirstName}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>電話番号
          </span>
          {values.phone}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>メールアドレス
          </span>
          {values.email}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>郵便番号
          </span>
          {values.zipCode}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>都道府県
          </span>
          {values.prefecture}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>市区町村
          </span>
          {values.city}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>番地
          </span>
          {values.address}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-warning">任意</span>
            建物名
          </span>
          {values?.building}
        </p>
        <h2 className={styles.kaitori}>買取希望商品情報の確認</h2>
        <hr />
        <div className={styles.formgroupuseditem}>
          <div className="used-item-formA">
            <h3 className={styles.h3tag}>買取希望商品１</h3>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>品名
              </span>
              {values.itemName}
            </p>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>品番
              </span>
              {values.itemCode}
            </p>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>サイズ（cm）
              </span>
              {values.itemSize}
            </p>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>カラー
              </span>
              {values.itemColor}
            </p>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>写真
              </span>
              {values?.itemPhoto[0]?.name}
            </p>
            <span className="subtitle-preview">*プレビュー</span>
            {!!imageData && (
              <span className="preview">
                {/* stateのバイナリデータを参照する */}
                <Image
                  src={imageData}
                  alt="画像プレビュー"
                  height={150}
                  width={150}
                />
              </span>
            )}
            <p>
              <span className="subtitle">
                <span className="label-fit label-warning">任意</span>
                備考
              </span>
              {values?.itemNote}
            </p>
          </div>
          <div className="used-item-formB">
            <h3 className={styles.h3tag}>買取希望商品２</h3>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>品名
              </span>
              {values?.itemNameB}
            </p>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>品番
              </span>
              {values?.itemCodeB}
            </p>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>サイズ（cm）
              </span>
              {values?.itemSizeB}
            </p>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>カラー
              </span>
              {values?.itemColorB}
            </p>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>写真
              </span>
              {values?.itemPhotoB[0]?.name}
            </p>
            <span className="subtitle-preview">*プレビュー</span>
            {!!imageDataB && (
              <span className="preview">
                <Image
                  src={imageDataB}
                  alt="画像プレビュー"
                  height={150}
                  width={150}
                />
              </span>
            )}
            <p>
              <span className="subtitle">
                <span className="label-fit label-warning">任意</span>
                備考
              </span>
              {values?.itemNoteB}
            </p>
          </div>
        </div>
        <hr />
        <div>
          <span className="subtitle">
            <span className="label-fit label-warning">任意</span>備考
          </span>
          {values?.itemAdd}
        </div>

        <div className="button001">
          <div className={styles.btn}>
            <Link href="/purchase" className="idbutton">
              入力内容を修正する
            </Link>
          </div>
        </div>
        <div>
          <div className={styles.btn}>
            <input
              type="submit"
              className="idbutton"
              value="入力内容を送信する"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PurchaseConfirmation;
